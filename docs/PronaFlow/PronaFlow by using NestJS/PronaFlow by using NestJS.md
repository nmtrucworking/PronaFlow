# 1. Chuẩn bị nền móng
## 1.1. Tạo root folder:
Step 1. Tại vị trí gốc của dự án: `/Web/project/pronaflow/`
Step 2. Sử dụng NestJS CLI để tạo dự án. run bash:
	Lý do sử dụng #NestJS - [[Why using NestJS]] 
```bash
nest new pronaflow-api
```
Step 03: Chọn Trình quản lý gói (package manager) -> Chọn: `npm`. 
	Lý do sử dụng #npm - [[Package Manager - npm]]
Step 04: Sau khi khởi tạo xong, di chuyển vào thư mục dự án:
```bash
cd pronaflow-api
```

## 1.2. Kiểm tra để đảm bảo mọi thứ được cài đặt đúng:
run bash sau, *chú ý*: vị trí hiện tại của bạn là `/pronaflow/pronaflow-api/`
```bash
npm run start:dev
```
Kiểm tra dòng cuối cùng sẽ tươn tự như: 
```bash
[Nest] Nest application successfully started
```
Mở trình duyệt web và truy cập vào địa chỉ `http://localhost:3000`.
Nếu xuất hiện nội dung `"Hello World"` -> Khởi tạo dự án thành công.
Dừng server ( #stop-server-api ): `Ctrl + C`

# 2. Xây dựng Cơ sở dữ liệu với #Prisma & #SQLite

Ở giai đoạn này sẽ thiết lập cơ sử để triển khai Kho lưu trữ - database.
Khởi tạo prisma cho dự án:
Step 1: Cài đặt Prisma CLI.
```bas
npm install prisma --save-dev
```
Step 2: Khởi tạo Prisma trong project.
```bash
npx prisma init
```
Lệnh trên sau khi thực thi sẽ tạo: `/pronaflow-api/prisma/` và `/pronaflow-aip/.env`

Thiết lập các nội dung:
Step 1: Mở file `/pronaflow/prisma/schema.prisma`
tìm và thay thế khối `datasource db` bằng nội dung: 
```bash
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}
```
Vấn trong file `/pronaflow/prisma/schema.prisma`, dán đoạn mã sau vào cuối file để định nghĩa cấu trúc cho người dùng và không gian làm việc.
```Prisma
model User {
  id        String    @id @default(cuid())
  email     String    @unique
  password  String
  fullName  String?
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}
```
-> Bắt đầu khởi tạo model `User`

Run code sau:
```wsl
npx prisma migrate dev --name init_user
```
Prisma sẽ tạo file cơ sở dữ liệu `dev.db` và tạo bẳng `User` bên trong nó.
Cài đặt #Prisma-Client (công cụ để tương tác với DB):
```bash
npm install @prisma/client
```

Tiếp theo, cần một "cầu nối" để ứng dụng NestJS có thể sử dụng Prisma
Step 1: Tạo thư mục mới: `src/prisma/`
Step 2: Tạo file `/src/prisma/prisma.service.ts` với nội dung:
```TS
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
```
Step 3: Tạo file `/src/prisma/prisma.module.ts` với nội dung:
```TS
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
```
Step 4: Kết nối vào ứng dụng chính: 
	Mở file `/src/app.module.ts` và import `PrismaModule` vào:
```TS
import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module'; // <-- Thêm dòng này
// ... các import khác

@Module({
  imports: [PrismaModule], // <-- Thêm vào đây
  // ...
})
export class AppModule {}
```

**Checkpoint**: Hiện tại đã có một dự án NestJS có thể chạy và một CSDL SQLite trống với bảng User.

# 3. Xây dựng tính năng đầu tiên - #Authentication
Mục tiêu: Cho phép người dùng đăng ký tài khoản mới.
Cần mã hóa mật khẩu ( #bcrypt ) và xác thực dữ liệu đầu vào:
Tại thư mục gốc (`pronaflow-api`), run các lệnh sau:
```bash
npm install bcrypt class-validator class-transformer
npm install @types/bcrypt --save-dev
```
Dùng NestJS CLI để tự động tạo các file cần thiết:
```bash
nest g module auth
nest g controller auth
nest g service auth
```
-> Các thao tác trên sẽ tạo một thư mục: `/src/auth/` chứa 3 file tương ứng.

# 4. Feature1: Register
Mục tiêu: Tạo một API endpoint `POST /auth/register` để người dùng có thể tạo tài khoản mới.
## **Step 1**. Tạo #DTO (Data Transfer Object) để Xác thực Dữ liệu.
Chúng ta cần đảm bảo dữ liệu người dùng gửi lên (email, password) là hợp lệ.
1. Trong thư mục `src/auth/` tạo một thư mục con là `dto/`
2. Bên trong `src/auth/dto/` tạo 1 file mới tên là `register-user.dto.ts`.
```js 
// src/auth/dto/register-user.dto.ts

import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty({ message: 'Email không được để trống' })
  @IsEmail({}, { message: 'Email không đúng định dạng' })
  email: string;

  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  @IsString()
  @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
  password: string;

  @IsNotEmpty({ message: 'Họ tên không được để trống' })
  @IsString()
  fullName: string;
}
```

Giải thích:
	- Class này định nghĩa "hình dạng" của dữ liệu cần thiết để đăng ký.
	- Các `@Decorator (IsEmail, @MinLenght)` đến từ thư viện `class-validator`. NestJS sẽ tự động dùng chúng để kiểm tra dữ liệu đầu vào. Nếu dữ liệu không hợp lệ, nó sẽ tự động trả về lỗi `400 Bad Request` cho client.

## **Step 2**. Viết Logic xử lý `AuthService`
Đây là bộ não của chức năng đăng ký.
1. Mở file `src/auth/auth.service.ts`
2. Inject `PrismaService` để có thể tương tác với cơ sở dữ liệu. Sau đó cần `bcryct` để mã hóa mật khẩu.
	Nội dung file `auth.service.ts`
```ts
// src/auth/auth.service.ts

import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async register(registerUserDto: RegisterUserDto) {
    const { email, password, fullName } = registerUserDto;

    // 1. Kiểm tra xem email đã tồn tại chưa
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('Email đã được sử dụng');
    }

    // 2. Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10); // 10 là salt rounds

    // 3. Lưu người dùng mới vào cơ sở dữ liệu
    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        fullName,
      },
    });

    // 4. Loại bỏ mật khẩu khỏi đối tượng trả về
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...result } = user;
    return result;
  }
}
```

## **Step 3**. Tạo #Endpoint trong `AuthController`
Tạo endpoint (url) để font-end gọi.
1. Mở file `src/auth/auth.controller.ts`.
	Nội dung file:
```ts
// src/auth/auth.controller.ts

import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('auth') // Tất cả các endpoint trong file này sẽ có tiền tố là /auth
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register') // Endpoint này sẽ là: POST /auth/register
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }
}
```

- **`@Controller('auth')`**: Định nghĩa tiền tố cho tất cả các route trong controller này. 
- **`@Post('register')`**: Ánh xạ các request `POST` đến `/auth/register` vào phương thức này. 
- **`@Body()`**: NestJS sẽ tự động lấy body của request và kiểm tra nó dựa trên `RegisterUserDto`. Nếu hợp lệ, nó sẽ gán vào biến `registerUserDto`.

## **Step 4**. Kích hoạt #Validation-Pipe Toàn cục
Để NestJS tự động sử dụng các bộ quy tắc trong #DTO của bạn, cần kích hoạt `ValidationPipe`
1. Mở file `src/main.ts`
2. Thêm 2 dòng như sau:
```ts
// src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; // <-- Thêm dòng này

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true })); // <-- Thêm dòng này

  await app.listen(3000);
}
bootstrap();
```

- **`useGlobalPipes(new ValidationPipe(...))`**: Áp dụng quy tắc validation cho TẤT CẢ các endpoint trong ứng dụng của bạn.
- **`whitelist: true`**: Tự động loại bỏ bất kỳ thuộc tính nào không được định nghĩa trong DTO. (Ví dụ: nếu client gửi thêm `age`, nó sẽ bị bỏ qua).

## Kiểm tra các kết quả ở thời điểm hiện tại
1. Khởi động #server:
```bash
npm run start:dev
```
2. Sử dụng công cụ test APi như Postman hoặc Insomnia.
	- Hướng dẫn sử dụng Insomnia để Test chức năng Đăng ký [[using Insomnia for Test Register-tool]]
3. Tạo một request mới:
	- Phương thức: `POST`
	- URL: `http://localhost:3000/auth/register`
	- Tab `Body`, chọn `raw` và `JSON`
```JSON
{ "email": "test@example.com", "password": "password123", "fullName": "Test User" }
```
4. Nhấn "send".
	- Kết quả: nhận được một `response JSON` chứa thông tin của người dùng vừa tạo (không có mật khẩu), và status code là `201 Created`
	- Thử gửi lại cùng một email: Bạn nhận được lỗi 409 Conflict với thông báo "Email is úing"
	- Thử gửi thiếu password: Bạn sẽ nhận được lỗi 400 Bad Request với thông báo 

# Feature2: Login and Security by using #JWT 
## Step 1. Cài đặt thư viện cần thiết cho #JWT 
NestJS có sự tích hợp tuyệt vời với `Passport.js`, một thư viện xác thực phổ biến.
1. Mở terminal trong thư mục dự án (`pronaflow-api/`) 
2. Chạy lệnh:
	```bash
	npm install @nestjs/jwt @nestjs/passport passport passport-jwt 
	npm install @types/passport-jwt --save-dev
	```
- **@nestjs/jwt**: Thư viện chính của NestJS để tạo và xác thực JSON Web Tokens.
- **@nestjs/passport, passport, passport-jwt**: Các thư viện để tích hợp chiến lược xác thực bằng JWT vào NestJS.
- **@types/passport-jwt**: Cung cấp type definitions cho TypeScript.
## Step 2. Cấu hình `AuthModule` để sử dụng JWT:
Chúng ta cần "đăng ký module JWT" và ấu hình một key bí mật (secret key) để ký và giải mã token.
1. mở file `src/auth/auth.module.ts`.
2. Cập nhật một số điểm như sau:
```ts
// src/auth/auth.module.ts

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt'; // <-- Import

@Module({
  imports: [
    JwtModule.register({ // <-- Cấu hình module JWT
      global: true, // <-- Quan trọng: làm cho module này khả dụng trên toàn ứng dụng
      secret: 'YOUR_SUPER_SECRET_KEY', // <-- SẼ THAY ĐỔI SAU
      signOptions: { expiresIn: '1d' }, // <-- Token sẽ hết hạn sau 1 ngày
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
```
**Lưu ý quan trọng:** Việc đặt `secret` key trực tiếp trong code là **rất không an toàn**. Chúng ta sẽ chuyển nó ra file `.env` ở một bước sau. Hiện tại cứ để như vậy cho đơn giản.

## Step 3. Viết Logic xử lý Đăng nhập trong `AuthService`
1. Mở file `src/auth/auth.service.ts`
2. Cần `JwtService` vào đây để có thể tạo token.
3. Thêm #DTO cho chức năng login và cập nhật `AuthService`.
	- Tạo file `src/auth/dto/login-user.dto.ts`
	```ts
	import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
	
	export class LoginUserDto {
	  @IsNotEmpty()
	  @IsEmail()
	  email: string;
	
	  @IsNotEmpty()
	  @IsString()
	  password: string;
	}
	```
	- Cập nhật `src/auth/auth.service.ts`:
```ts
// src/auth/auth.service.ts

import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common'; // Thêm UnauthorizedException
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto'; // <-- Import DTO mới
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt'; // <-- Import JwtService

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService, // <-- "Tiêm" JwtService
  ) {}

  // ... hàm register() giữ nguyên
  async register(registerUserDto: RegisterUserDto) {
    // ...
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    // 1. Tìm người dùng bằng email
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Email hoặc mật khẩu không hợp lệ');
    }

    // 2. So sánh mật khẩu
    const isPasswordMatching = await bcrypt.compare(password, user.password);

    if (!isPasswordMatching) {
      throw new UnauthorizedException('Email hoặc mật khẩu không hợp lệ');
    }

    // 3. Tạo JWT Payload
    const payload = { sub: user.id, email: user.email };

    // 4. Ký và tạo token
    const accessToken = await this.jwtService.signAsync(payload);

    // 5. Trả về token cho client
    return {
      access_token: accessToken,
    };
  }
}
```

## Step 4. Tạo Endpoint Đăng nhập trong AuthControllder
1. Mở `src/auth/auth.controller.ts`
2. Chính sửa một số điểm như sau:
	- Import thêm thư viện:
		```ts
		import { LoginUserDto } from './dto/login-user.dto';
		```
	- Thêm endpoint login:
		```ts
		@Post('login') // <-- Endpoint mới login(@Body() 
		login(@Body() loginUserDto: LoginUserDto) { 
			return this.authService.login(loginUserDto); 
		}
		```

**Checkpoint**: Đến đây, bạn đã có chức năng đăng nhập! Bạn có thể dùng Insomnia/Postman để test endpoint `POST` `/auth/login` với email và password đã đăng ký. Nếu thành công, bạn sẽ nhận lại một chuỗi `access_token` dài.
## Step 5. Tạo JWT Strategy -  Bảo vệ API (==important==)
Đảm bảo rằng chỉ những ai có `access_token` hợp lệ mới được vào.
Strategy là một "bộ quy tắc" để Passport biết cách xác thực một loại token cụ thể.
1. Trong `src/auth/`, tạo thư mục `strategies/`
2. Bên trong `src/auth/strategies/`, tạo file `jst.strategy.ts`:
```ts
// src/auth/strategies/jwt.strategy.ts

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Lấy token từ header "Authorization: Bearer ..."
      ignoreExpiration: false, // Không bỏ qua nếu token hết hạn
      secretOrKey: 'YOUR_SUPER_SECRET_KEY', // PHẢI GIỐNG HỆT key trong auth.module
    });
  }

  // Sau khi token được xác thực là hợp lệ, phương thức này sẽ được gọi
  async validate(payload: any) {
    // payload là nội dung đã được giải mã từ JWT
    return { userId: payload.sub, email: payload.email }; // <-- Dữ liệu này sẽ được gắn vào đối tượng request
  }
}
```
3. Đăng ký Strategy này trong `AuthModule`. Mở `src/auth/auth.module.ts` và thêm `JwtStrategy` vào mảng `providers`:
```ts
// ... imports
import { JwtStrategy } from './strategies/jwt.strategy'; // <-- Import

@Module({
  // ... imports: [JwtModule.register({...})]
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy], // <-- Thêm JwtStrategy vào đây
})
export class AuthModule {}
```
## **Step 6**. Tạo #Guard (*Người bảo vệ*)
Guard sẽ sử dụng Strategy ở trên để quyết định cho phép hay từ chối một request
1. Trong `src/auth/`, tạo thư mục `guards/`
2. Bên trong `src/auth/guards/`, tạo file `jwt-auth.guards.ts`:
```ts
// src/auth/guards/jwt-auth.guard.ts

import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {} // Chỉ cần kế thừa từ AuthGuard('jwt') là đủ
```

## **Step 7**. Áp dụng Guard để bảo vệ Endpoint
Bây giờ, hãy tạo endpoint ví dụ trong `UsersModule` để xe, cách Guard hoạt động.
1. Tạo `UsersModule`
```bash
nest g module users
nest g controller users
```
2. Mở `src/users/users.controller.ts`
```ts
// src/users/users.controller.ts

import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'; // <-- Import Guard

@Controller('users')
export class UsersController {
  
  @UseGuards(JwtAuthGuard) // <-- ÁP DỤNG "Ổ KHÓA"
  @Get('profile')
  getProfile(@Request() req) {
    // req.user chính là dữ liệu được trả về từ phương thức validate() trong JwtStrategy
    return req.user; 
  }
}
```
## Kiểm tra kết quả cho đến thời điểm hiện tại
1.  **Khởi động lại server** (`npm run start:dev`).
2.  **Dùng Insomnia/Postman:**
    *   **Thử truy cập profile mà không có token:**
        *   Tạo request `GET` đến `http://localhost:3000/users/profile`.
        *   Nhấn `Send`.
        *   **Kết quả:** Bạn sẽ nhận được lỗi `401 Unauthorized`. "Người bảo vệ" đã chặn bạn lại!
    *   **Truy cập profile với token hợp lệ:**
        *   Dùng lại request `login` để lấy `access_token`. Copy chuỗi token này.
        *   Quay lại request `GET /users/profile`.
        *   Chuyển sang tab **`Auth`**.
        *   Chọn `Bearer Token` từ dropdown.
        *   Dán chuỗi `access_token` vào ô `TOKEN`.
        *   Nhấn `Send`.
        *   **Kết quả:** Bạn sẽ nhận được response `200 OK` với thông tin `{ "userId": "...", "email": "..." }`. Bạn đã vào được bên trong!
# Feature3: Module `Workspace` 
Mục tiêu: 
1. Cập nhật chúc năng Đăng ký (Register) để tạo tự động Workspace mặc định.
2. Xây dựng API cho phép người dùng tạo thêm các Workspace mới (ngoài mặc định).
3. Xây dựng API để lấy danh sách tất cả các Workspace mà người dùng sở hữu.
## **Step 1**. Cập nhật `Prisma Schema` 
1. Mở file `prisma/schema.prisma`
2. Định nghĩa lại theo nội dung bên dưới:
```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

model User {
  id        String    @id @default(cuid())
  email     String    @unique
  password  String
  fullName  String?
  avatarUrl String?
  bio       String?
  theme     Theme     @default(LIGHT)
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt

  // Mối quan hệ: Một User sở hữu nhiều Workspace
  ownedWorkspaces Workspace[]
}

model Workspace {
  id          String    @id @default(cuid())
  name        String
  description String?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  // Mối quan hệ: Workspace này thuộc về User nào
  ownerId     String
  owner       User      @relation(fields: [ownerId], references: [id], onDelete: Cascade)
}

enum Theme {
  LIGHT
  DARK
}
```
3. Chạy Migration: Áp dụng những thay đổi này vào cơ sở dữ liệu:
```bash
npx prisma migrate dev --name update_workspace_ownership
```

## Step 2. Cập nhật Logic Đăng ký để tự động tạo Workspace.
Yêu cầu nghiệp vụ: Khi một người dùng đăng ký, server tự tạo một Workspace mặc định cho họ.
1. Tạo Module `workspace`
```bash
nest g module workspaces
nest g service workspaces
nest g controller workspaces
```
1. Cập nhật `AuthModule`: `AuthServer` cần phải giao tiếp được với `WorkspacesService`.
	1. Mở `src/auth/auth.module.ts`.
	2. Import `WorkspaceModule`
```ts
// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { WorkspacesModule } from 'src/workspaces/workspaces.module'; // <-- Thêm dòng này

@Module({
  imports: [
    WorkspacesModule, // <-- Thêm vào đây
    JwtModule.register({ /* ... */ }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
```
3. Cập nhật `AuthService`
	- Mở `src/auth.service.ts`
	- "Tiêm" `WorkspacesService` vào và điều chỉnh lại `register` để đảm bảo nghiệp vụ
```ts
// src/auth/auth.service.ts
// ... các import khác
import { WorkspacesService } from 'src/workspaces/workspaces.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private workspacesService: WorkspacesService, // <-- Tiêm WorkspacesService
  ) {}

  async register(registerUserDto: RegisterUserDto) {
    const { email, password, fullName } = registerUserDto;

    const existingUser = await this.prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new ConflictException('Email đã được sử dụng');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Dùng transaction để đảm bảo cả hai thao tác đều thành công
    const newUser = await this.prisma.$transaction(async (prisma) => {
      // 1. Tạo User mới
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          fullName,
        },
      });

      // 2. Tự động tạo Workspace mặc định cho User này
      await this.workspacesService.createDefaultWorkspace(user.id, user.fullName || 'User', prisma);

      return user;
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...result } = newUser;
    return result;
  }

  // ... hàm login() giữ nguyên
}
```
## Step 3. Viết logic trong `WorkspacesService`
Service này chứa logic để tạo workspace (cả mặc định và tạo thêm)
1. Mở `src/workspaces/workspaces.service.ts`
2. Viết các phương thức cần thiết:
```ts
// src/workspaces/workspaces.service.ts
import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';

// Định nghĩa kiểu cho transaction client
type PrismaTransactionClient = Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'>;

@Injectable()
export class WorkspacesService {
  constructor(private prisma: PrismaService) {}

  // Phương thức tạo Workspace mặc định (được gọi từ AuthService)
  async createDefaultWorkspace(userId: string, userName: string, prisma: PrismaTransactionClient) {
    return prisma.workspace.create({
      data: {
        name: `${userName}'s Workspace`, // Tên theo yêu cầu: "{user-name}'s Workspace"
        ownerId: userId,
      },
    });
  }

  // Phương thức tạo Workspace mới (được gọi từ API)
  async create(createWorkspaceDto: CreateWorkspaceDto, userId: string) {
    return this.prisma.workspace.create({
      data: {
        name: createWorkspaceDto.name,
        ownerId: userId,
      },
    });
  }

  // Phương thức lấy tất cả Workspaces mà người dùng sở hữu
  async findAllForUser(userId: string) {
    return this.prisma.workspace.findMany({
      where: {
        ownerId: userId,
      },
      orderBy: {
        createdAt: 'asc', // Sắp xếp theo ngày tạo
      }
    });
  }
}
```
## Tạo #Endpoint trong WorkspacesController
=> Tạo API để người dùng có thể tạo thêm workspace và xem danh sách
1. Tạo DTO cho Workspace:
	-  Tạo thư mục `src/workspace/dto/`
	- Tạo file `src/workspace/dto/create-workspace.dto.ts`
```ts
// src/workspaces/dto/create-workspace.dto.ts
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateWorkspaceDto {
  @IsNotEmpty({ message: 'Tên không được để trống' })
  @IsString()
  @MaxLength(100)
  name: string;
}
```
2. Tạo API `controller`: file `src/workspaces/workspaces.controller.ts`
```ts
// src/workspaces/workspaces.controller.ts
import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { WorkspacesService } from './workspaces.service';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('workspaces')
export class WorkspacesController {
  constructor(private readonly workspacesService: WorkspacesService) {}

  @Post() // POST /workspaces - Để tạo thêm các workspace mới
  create(@Body() createWorkspaceDto: CreateWorkspaceDto, @Request() req) {
    const userId = req.user.userId;
    return this.workspacesService.create(createWorkspaceDto, userId);
  }

  @Get() // GET /workspaces - Để lấy danh sách các workspace người dùng sở hữu
  findAllForUser(@Request() req) {
    const userId = req.user.userId;
    return this.workspacesService.findAllForUser(userId);
  }
}
```
## Kiểm tra đến thời điểm hiện tại
1.  **Khởi động lại server** (`npm run start:dev`).
2.  **Test Chức năng Đăng ký (Quan trọng):**
    *   Gửi request `POST /auth/register` với thông tin người dùng mới (ví dụ: `new_user@example.com`).
    *   **Kết quả:** Bạn nhận được thông tin người dùng.
    *   **Kiểm tra Database:** Dùng công cụ xem DB (DB Browser for SQLite) mở file `dev.db`. Bạn phải thấy:
        *   Một dòng mới trong bảng `User`.
        *   Một dòng mới trong bảng `Workspace` với `name` là `"{tên người dùng}'s Workspace"` và `ownerId` chính là `id` của người dùng vừa tạo.

3.  **Test Lấy danh sách Workspaces:**
    *   Đăng nhập với tài khoản `new_user@example.com` để lấy `access_token`.
    *   Gửi request `GET /workspaces` (kèm token).
    *   **Kết quả:** Bạn sẽ nhận được một mảng chứa Workspace mặc định vừa được tạo tự động.

4.  **Test Tạo thêm Workspace:**
    *   Gửi request `POST /workspaces` (kèm token) với body: `{"name": "Dự án Freelance"}`.
    *   **Kết quả:** Bạn nhận được thông tin workspace mới.
    *   Gửi lại request `GET /workspaces`. Bây giờ bạn sẽ thấy một mảng chứa 2 workspace.
