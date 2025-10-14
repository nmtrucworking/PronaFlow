#### **Bước 2.1: Khởi tạo Prisma**

Nếu bạn chưa chạy lệnh này, hãy mở terminal trong thư mục gốc của dự án và gõ:

```bash
npx prisma init
```

Lệnh này sẽ tạo ra:
*   Một thư mục mới tên là `prisma`.
*   Bên trong `prisma`, có file `schema.prisma` - đây là "bản thiết kế" cho cơ sở dữ liệu của bạn.
*   Một file `.env` ở thư mục gốc để chứa các biến môi trường (như chuỗi kết nối DB).

#### **Bước 2.2: Cấu hình Prisma để dùng SQLite**

Đây là bước quan trọng nhất để chuyển sang dùng SQLite.

1.  Mở file `prisma/schema.prisma`.
2.  Tìm đến khối `datasource db { ... }`.
3.  **Xóa nội dung mặc định** và thay thế bằng khối sau:

    ```ts
    datasource db {
      provider = "sqlite"
      url      = "file:./dev.db"
    }
    ```

    *   **Giải thích:** Dòng này báo cho Prisma rằng:
        *   `provider`: Chúng ta đang sử dụng cơ sở dữ liệu `sqlite`.
        *   `url`: Dữ liệu sẽ được lưu trong một file tên là `dev.db` nằm ngay tại thư mục gốc của dự án.

4.  Mở file `.env`. Bạn có thể **xóa hoặc comment** (thêm dấu `#` ở đầu) dòng `DATABASE_URL` đi vì nó không còn cần thiết nữa.

#### **Bước 2.3: Định nghĩa Mô hình Dữ liệu (Schema)**

Bây giờ, chúng ta sẽ định nghĩa cấu trúc của các bảng `User` và `Workspace` trong file `prisma/schema.prisma`.

Hãy copy và dán đoạn code sau vào cuối file `prisma/schema.prisma`:

```prisma
model User {
  id         String    @id @default(cuid()) // Khóa chính, tự động tạo ID duy nhất
  email      String    @unique // Đảm bảo email là duy nhất
  password   String
  fullName   String?   // Dấu ? nghĩa là trường này không bắt buộc (optional)
  createdAt  DateTime  @default(now())
  updatedAt  DateTime  @updatedAt

  // Mối quan hệ: Một User có thể là thành viên của nhiều Workspace
  workspaces WorkspaceMember[]
}

model Workspace {
  id          String    @id @default(cuid())
  name        String
  description String?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  // Mối quan hệ: Một Workspace có nhiều thành viên
  members     WorkspaceMember[]
}

// Bảng trung gian để quản lý vai trò của User trong Workspace (quan hệ nhiều-nhiều)
model WorkspaceMember {
  id          String    @id @default(cuid())
  role        String    @default("MEMBER") // Vai trò mặc định là "MEMBER"

  // Khóa ngoại trỏ đến User và Workspace
  userId      String
  workspaceId String
  user        User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  workspace   Workspace @relation(fields: [workspaceId], references: [id], onDelete: Cascade)

  // Đảm bảo một user chỉ có một vai trò duy nhất trong một workspace
  @@unique([userId, workspaceId])
}
```

#### **Bước 2.4: Chạy Migration để tạo Cơ sở dữ liệu**

Migration là quá trình Prisma đọc "bản thiết kế" (`schema.prisma`) và tạo ra cơ sở dữ liệu thật.

*   Trong terminal, chạy lệnh:
    ```bash
    npx prisma migrate dev --name init
    ```

*   Lệnh này sẽ làm các việc sau:
    1.  Đọc file `schema.prisma` của bạn.
    2.  Tự động **tạo ra file `prisma/dev.db`**. Đây chính là file cơ sở dữ liệu SQLite của bạn.
    3.  Tạo một thư mục `prisma/migrations` để lưu lại lịch sử các thay đổi cấu trúc DB.
    4.  Áp dụng các thay đổi, tạo ra các bảng `User`, `Workspace`, `WorkspaceMember` bên trong file `dev.db`.
    5.  Tự động chạy `prisma generate` để tạo ra **Prisma Client** - một bộ công cụ "type-safe" để bạn tương tác với DB từ code TypeScript.

#### **Bước 2.5: Tích hợp Prisma vào NestJS**

Để sử dụng Prisma trong NestJS một cách gọn gàng, chúng ta sẽ tạo một `PrismaModule` dùng chung.

1.  **Tạo Prisma Service:** Tạo một thư mục `src/prisma` và bên trong đó, tạo file `prisma.service.ts` với nội dung:
    ```typescript
    import { Injectable, OnModuleInit } from '@nestjs/common';
    import { PrismaClient } from '@prisma/client';

    @Injectable()
    export class PrismaService extends PrismaClient implements OnModuleInit {
      async onModuleInit() {
        await this.$connect();
      }
    }
    ```

2.  **Tạo Prisma Module:** Trong cùng thư mục `src/prisma`, tạo file `prisma.module.ts`:
    ```typescript
    import { Module } from '@nestjs/common';
    import { PrismaService } from './prisma.service';

    @Module({
      providers: [PrismaService],
      exports: [PrismaService], // Export để các module khác có thể dùng
    })
    export class PrismaModule {}
    ```

3.  **Import vào AppModule chính:** Mở file `src/app.module.ts` và import `PrismaModule` vào.
    ```typescript
    import { Module } from '@nestjs/common';
    import { AppController } from './app.controller';
    import { AppService } from './app.service';
    import { PrismaModule } from './prisma/prisma.module'; // <-- Thêm dòng này

    @Module({
      imports: [PrismaModule], // <-- Thêm PrismaModule vào đây
      controllers: [AppController],
      providers: [AppService],
    })
    export class AppModule {}
    ```

#### **Bước 2.6: Kiểm tra lại thành quả**

Trước khi đi tiếp, hãy kiểm tra xem mọi thứ đã đúng chưa:
*   Trong thư mục gốc của dự án, bạn có thấy file `dev.db` không?
*   Trong thư mục `prisma`, có thư mục con `migrations` không?
*   Bạn đã tạo và viết code cho `prisma.service.ts` và `prisma.module.ts` chưa?
*   Bạn đã import `PrismaModule` vào trong `AppModule` chưa?

---

**Chúc mừng!** Bạn đã hoàn thành phần thiết lập cơ sở dữ liệu, phần thường gây nhiều khó khăn nhất. Bây giờ bạn đã có một nền tảng dữ liệu vững chắc và sẵn sàng để xây dựng các tính năng.

**Bước tiếp theo sẽ làm gì?**

Bây giờ chúng ta sẽ chuyển sang **Bước 3: Xây dựng Module Xác thực (Authentication)**, bắt đầu với chức năng đăng ký người dùng mới.
