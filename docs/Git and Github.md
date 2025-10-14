# Kiểm tra cài đặt và phiên bản #Git 
```bash
git --version
```
nếu chưa có, cài đặt bằng:
```bash
sudo apt update
sudo apt install git -y
```
# Cấu hình Git (chỉ cần làm 1 lần)
Thiết lập thông tin cá nhân để commit:
```bash
git config --global user.name "username"
git config --global user.email "email@domain.com"
```
Kểm tra lại thông tin:
```bash
git config --list

user.name=NGUYEN-MINH-TRUC
user.email=nmtruc.study@gmail.com
```
## 3. Tạo SSH key để kết nối với GitHub.
```bash
ssh-keygen -t ed25519 -C "nmtruc.study@gmail.com"
```
Mặc định key lưu tại:
```bash
~/.ssh/id_ed25519
```
Lấy key:
```bash
cat ~/.ssh/id_ed25519.pub
```
-> Copy key và thêm vào GitHub tại:
**`Setting`** > **`SSH and GPG keys`** > **`New SSH key`**
# A. *Flow*
## **Case 1**: Owner
### **1. Khởi tạo dự án trong git repo**
1. Tạo repo
2. clone về máy
	1. Mở terminal
	2. Copy link `HTTPS` hoặc `SSH` -> `{url}`
```bash
git clone {url}
```
VD:
- Sử dụng HTTPS:
```bash
git clone https://github.com/username/repo.git
```
- Sử dụng SSH (nên dùng nếu đã setup SSH key):
```bash
git clone git@github.com:username/repo.git
```
### **Khởi tạo dự án tại local**


## **Case 2**: Members

# B. Sample Lines
1. Kiểm tra trạng thái:
```bash
git status
```
2. Thêm file vào stagging:
```bash
git add {file_name}
# add all
git add .
```
3. Commit thay đổi
```bash
git commit -m "descriptions"
```
4. Đẩy lên GitHub:
```bash
git push origin branch_name
```
VD:
```bash
git push origin main
```
5. Lấy code mới nhất:
```bash
git pull origin branch_name
```
# Links
[# Từ gà tới pro Git và Github trong 20 phút - Tự học Git siêu tốc](https://youtu.be/1JuYQgpbrW0)
# My Github - nmtrucworking
([Your Repositories](https://github.com/nmtrucworking?tab=repositories))


```bash
git status
```

```bash

```