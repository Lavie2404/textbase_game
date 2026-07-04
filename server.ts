import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini API Client server-side
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
  try {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    console.log("Gemini Client successfully initialized on backend.");
  } catch (err) {
    console.error("Failed to initialize Gemini Client:", err);
  }
} else {
  console.log("No valid GEMINI_API_KEY found. Falling back to procedural local game content generator.");
}

// ========================== API ENDPOINTS ==========================

// Endpoint check API Health
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", aiEnabled: !!aiClient });
});

// Endpoint generate dynamic quest scenario using Gemini
app.post("/api/adventure/generate", async (req, res) => {
  const { playerClass, playerLevel, playerStats, zoneName, lastAction } = req.body;

  if (!aiClient) {
    return res.status(200).json({ 
      error: "AI_OFFLINE", 
      message: "Chế độ ngoại tuyến: Đang sử dụng cốt truyện dựng sẵn siêu hấp dẫn!" 
    });
  }

  try {
    const classNames: Record<string, string> = {
      cuong_cong: 'Cường công hệ (Chiến sĩ cận chiến dũng mãnh, sức mạnh áp đảo)',
      man_cong: 'Mẫn công hệ (Sát thủ tốc độ vô song, chí mạng kinh hoàng)',
      phong_thu: 'Phòng thủ hệ (Khiên sĩ vách sắt vô địch, chịu đòn kiên cường)',
      khong_che: 'Khống chế hệ (Ma pháp sư điều khiển trận thế, khắc chế quần địch)',
      ho_tro: 'Hỗ trợ hệ (Hỗ trợ sư hồi phục sinh mệnh, gia cường thuộc tính)'
    };

    const prompt = `Bạn là một AI quản trò (Game Master) tài ba của trò chơi nhập vai văn bản (Text RPG) chủ đề fantasy Đấu La kiếm hiệp cổ điển bằng Tiếng Việt.
Tạo một tình huống gặp gỡ dã ngoại ngẫu nhiên đầy kịch tính, phong phú bằng Tiếng Việt tại phân khu "${zoneName}".
Cơ thể người chơi:
- Phân lớp nhân vật: ${classNames[playerClass] || playerClass}
- Cấp độ hiện tại: ${playerLevel}
- Chỉ số hiện tại: 
  + Tấn công (atk): ${playerStats.atk}
  + Tốc độ (spd): ${playerStats.spd}
  + Máu tối đa (hp): ${playerStats.hp}
  + Phòng thủ (def): ${playerStats.def}
  + Tỷ lệ bạo kích (critRate): ${playerStats.critRate}%
  + Sát thương bạo kích (critDmg): ${playerStats.critDmg}%
  + Giảm sát thương (dmgReduce): ${playerStats.dmgReduce}%
  + Tăng sát thương (dmgIncrease): ${playerStats.dmgIncrease}%
- Hành động trước đó của người chơi: ${lastAction || 'Đang bắt đầu hành trình'}

Hãy tạo một tình huống độc đáo, huyền bí, đầy thử thách lựa chọn trí tuệ và thuộc tính. 
Yêu cầu trả về đúng cấu trúc JSON sau:
{
  "title": "Tiêu đề cuộc gặp gỡ kịch tính ngắn gọn",
  "description": "Mô tả tình huống chi tiết đầy kịch văn học nghệ thuật, mô tả không gian hoành tráng bằng Tiếng Việt (100-150 từ)",
  "options": [
    {
      "text": "Lựa chọn 1 (Ghi rõ yêu cầu chỉ số, ví dụ: 'Bộc phát [Tấn Công] phá nát cổng đá')",
      "reqStat": "atk", // có thể là bất cứ khoá nào trong 8 chỉ số trên: 'atk', 'spd', 'hp', 'def', 'critRate', 'critDmg', 'dmgReduce', 'dmgIncrease' hoặc null
      "reqVal": ${Math.round(playerStats.atk * 1.1 + 2)}, // Chỉ số tối thiểu để vượt qua (phù hợp với chỉ số hiện tại của họ)
      "outcome": {
        "text": "Mô tả chi tiết kết quả thành công rực rỡ dũng mãnh bằng Tiếng Việt",
        "hpChange": 0, // lượng hp hồi hoặc mất (-30, 20, v.v)
        "mpChange": 0,
        "goldChange": ${Math.round(playerLevel * 40 + 60)},
        "xpChange": ${Math.round(playerLevel * 20 + 40)},
        "essenceChange": 3,
        "itemLoot": true,
        "lootRarityChance": "rare" // 'common', 'uncommon', 'rare', 'epic', 'legendary'
      }
    },
    {
      "text": "Lựa chọn 2 (Yêu cầu chỉ số phòng thủ hay tốc độ, ví dụ: 'Dùng [Tốc Độ] né tránh lưỡi dao')",
      "reqStat": "spd",
      "reqVal": ${Math.round(playerStats.spd * 1.05 + 1)},
      "outcome": {
        "text": "Mô tả kết quả hành động dẻo dai khéo léo của người chơi bằng Tiếng Việt",
        "hpChange": -10,
        "mpChange": 0,
        "goldChange": ${Math.round(playerLevel * 25 + 30)},
        "xpChange": ${Math.round(playerLevel * 15 + 30)},
        "essenceChange": 1,
        "itemLoot": false
      }
    },
    {
      "text": "Lựa chọn 3 (Yêu cầu tỷ lệ chí mạng hay sát thương chí mạng cao)",
      "reqStat": "critRate",
      "reqVal": ${Math.round(playerStats.critRate * 0.9 + 2)},
      "outcome": {
        "text": "Mô tả kết quả vận may siêu việt rơi rương kho báu thần thoại cổ đại dâng hiến bằng Tiếng Việt",
        "hpChange": -20,
        "mpChange": 20,
        "goldChange": ${Math.round(playerLevel * 60 + 120)},
        "xpChange": ${Math.round(playerLevel * 25 + 60)},
        "essenceChange": 6,
        "itemLoot": true,
        "lootRarityChance": "epic"
      }
    },
    {
      "text": "Lựa chọn 4 (Lựa chọn an toàn, không yêu cầu thuộc tính)",
      "reqStat": null,
      "reqVal": null,
      "outcome": {
        "text": "Mô tả hành trình tránh xa nguy hiểm an toàn dạo bước, hồi lại một ít sinh lực ma pháp khí lực bằng Tiếng Việt",
        "hpChange": 35,
        "mpChange": 25,
        "goldChange": 15,
        "xpChange": 20,
        "essenceChange": 0,
        "itemLoot": false
      }
    }
  ]
}

Chú ý: Trả về chuỗi JSON thô có thể parse được, không chứa định dạng markdown \`\`\`json hay \`\`\`. Trực tiếp trả về JSON thô.`;

    const response = await aiClient.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.8,
      }
    });

    const cleanText = response.text?.trim() || "";
    const parsedData = JSON.parse(cleanText);
    res.json(parsedData);
  } catch (err) {
    console.error("Gemini adventure generation failed, fallback to offline:", err);
    res.status(200).json({ 
      error: "AI_FAILED", 
      message: "Cốt truyện huyền thoại tự động được kích hoạt!" 
    });
  }
});

// Endpoint generate Tavern Rumors dynamically
app.post("/api/tavern/rumors", async (req, res) => {
  const { playerLevel, zoneName } = req.body;

  if (!aiClient) {
    return res.json({
      rumor: "Quán rượu xôn xao tin đồn về một Ma Long thức tỉnh ở Núi Lửa Tận Diệt. Chỉ có trang bị huyền thoại mới xuyên qua vảy rồng!"
    });
  }

  try {
    const prompt = `Bạn là một NPC chủ quán rượu (Innkeeper) lém lỉnh, hiểu biết sâu rộng trong một game nhập vai RPG.
Hãy kể một lời đồn đại bí mật, thú vị hoặc hướng dẫn người chơi mạo hiểm tại vùng đất "${zoneName}" (Cấp độ người chơi: ${playerLevel}).
Lời kể mang phong thái đậm chất cổ tích, hài hước và thần bí bằng Tiếng Việt. Giới hạn trong khoảng 2-3 câu ngắn gọn (dưới 60 từ).`;

    const response = await aiClient.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        temperature: 0.9,
      }
    });

    res.json({ rumor: response.text?.trim() });
  } catch (err) {
    res.json({
      rumor: "Người dân rỉ tai nhau rằng: Nếu nâng chỉ số May Mắn (LUK), tỷ lệ nhặt được trang bị Huyền Thoại rực rỡ từ quái vật tinh anh sẽ gia tăng vượt bậc!"
    });
  }
});

// ========================== VITE MIDDLEWARE SETUP ==========================

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite Development Server middleware mounted.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving static production files from:", distPath);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Text RPG Server is listening on http://localhost:${PORT}`);
  });
}

startServer();
