- Quản lý code, cấu hình, phụ thuộ và công cụ phát triển.
- Đối với Node.js thì sẽ được mô tả như case bên dưới
	```bash
	my-backend-project/
	│── src/
	│   ├── controllers/
	│   ├── services/
	│   ├── models/
	│   ├── routes/
	│   └── index.ts
	│
	│── tests/
	│── .env
	│── .gitignore
	│── package.json
	│── tsconfig.json
	│── Dockerfile
	│── README.md
	```
Trong đó,
## 1. `src/` hoặc `app/`
- Chứa toàn bộ code chính:
	- `controller/`
	- `service/`
	- `model/`
	- `routers/`
	- ...
- Nơi chứa toàn bộ **logic nghiệp vụ** (business logic), chia thành nhiều **layer** (tầng) để dễ bảo trì và mở rộng.
### 1.1. `controllers/` (hoặc `routes/`, `handlers/`)
Nhiệm vụ:
- Nhận request từ client.
- Gọi service để xử lý logic.
- Trả response về client.
Ví dụ (Express): 
```ts
// src/controllers/user.controller.ts
import { Request, Response } from "express";
import * as userService from "../services/user.service";

export const getUser = async (req: Request, res: Response) => {
  const user = await userService.findById(req.params.id);
  res.json(user);
};
```
### 1.2. `services/` (business logic)
Nhiệm vụ:
- Chứa logic nghiệp vụ (không phụ thuộc framework).
- Thông thường gọi đến `modules/` hoặc repository để lấy dữ liệu.
Ví dụ:
```ts
// src/services/user.service.ts
import { User } from "../models/user.model";

export const findById = async (id: string) => {
  return await User.findById(id);
};
```
#### 1.3. `modules/` (hoặc `entities/`, `schemas/`)
Nhiệm vụ:
- Định nghĩa cấu trúc dữ liệu (ORM schema, DTO, interface).
- Ví dụ dùng Mongoose, Prisma, Sequelize hoặc class entity.
Ví dụ (Mongoose):
```ts
// src/models/user.model.ts
import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

export const User = model("User", userSchema);
```
### 1.4. `middlewares/`
Nhiệm vụ:
- Xử lý request trước khi đến controller.
- Ví dụ: Xác thực JWT, logging, validate input.
Ví dụ:
```ts
// src/middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
    if (err) return res.status(403).json({ error: "Forbidden" });
    (req as any).user = decoded;
    next();
  });
};
```
### 1.5. `routes/` (nếu tách riêng khỏi controller)
Nhiệm vụ: Định nghĩa URL endpoint và gán với controller.
**Ví dụ**:
```ts
// src/routes/user.routes.ts
import { Router } from "express";
import { getUser } from "../controllers/user.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.get("/:id", authenticate, getUser);

export default router;
```
### 1.6. `config/`
Nhiệm vụ: Chứa file cấu hình (DB), email, cache, logger.
Ví dụ:
```ts
// src/config/db.ts
import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI!);
  console.log("MongoDB connected");
};
```
### 1.7. `utils/` hoặc `helpers/`
Nhiệm vụ: Chứa các hàm tiện ích tái sử dụng.
Ví dụ:
```ts
// src/utils/hash.ts
import bcrypt from "bcrypt";

export const hashPassword = (password: string) => bcrypt.hash(password, 10);
export const comparePassword = (password: string, hash: string) => bcrypt.compare(password, hash);
```
### 1.9. `index.ts` hoặc `server.ts`
Nhiệm vụ: entry point của ứng dụng.
Ví dụ:
```ts
// src/index.ts
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import userRoutes from "./routes/user.routes";

dotenv.config();
const app = express();

app.use(express.json());
app.use("/users", userRoutes);

connectDB();

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});
```
### Tổng quát:
```bash
src/
├── config/         # Cấu hình DB, logger, cache
├── controllers/    # Xử lý request & response
├── services/       # Business logic
├── models/         # ORM / Schema dữ liệu
├── middlewares/    # Middleware (auth, validation)
├── routes/         # Endpoint định nghĩa
├── utils/          # Hàm tiện ích
├── dtos/           # Định nghĩa kiểu dữ liệu
├── index.ts        # Entry point
```

## 2. `tests/`
- Chứa unit test, integration test.
- Đảm bảo chất lượng code.
## 3. File quản lý phụ thuộc.
- Node.js: `package.json`
- - Python: `requirements.txt` hoặc `pyproject.toml`
- Java (Spring): `pom.xml` hoặc `build.gradle`
- .NET: `.csproj`
## 4. File cấu hình môi trường.
- `.env` (chứa biến môi trường: DB_URL, PORT, API_KEY, …).
- Có thể có `.env.development`, `.env.production`.
## 5. File cấu hình & công cụ
- `docker-compose.yml/` / `Dockerfile` --> Chạy với Docker.
- `eslint.config.js`, `.prettierrc` --> format & lint code.
- `.gitignore` --> Bỏ qua file khi commit.
- `tsconfig.json` (Nếu TypeScript).
## 6. Scripts & CI/CCCCC
- `MakeFile`, `scripts/` (Nếu có).
- `.github/workflows/` (cho GitHub Actions)
## 7. Tài liệu dự án.
- `README.md` --> mô tả project, cách cài đặt và chạy.
- `LICENSE` --> Giấy phép.
- `docs/` --> Tài liệu API, kiến trúc.

