# STUDAI

Nền tảng mô phỏng khoa học trực quan kết hợp AI dành cho học sinh THCS.

---

> [!NOTE]
> StudAI là giải pháp học tập Khoa học Tự nhiên lớp 8 hiện đại, tập trung vào việc biến các công thức và lý thuyết trừu tượng thành các tương tác trực quan sinh động qua các mô phỏng vật lý chân thực và sơ đồ tư duy tương tác.

---

## Tính năng cốt lõi

| Tính năng | Chi tiết kỹ thuật | Vai trò trong học tập |
| :--- | :--- | :--- |
| **Bento Grid Dashboard** | Giao diện bất đối xứng hiện đại, tích hợp bộ phát quang viền (glow shadows) động theo phần trăm bài học đã hoàn thành của từng môn học. | Giúp học sinh theo dõi tiến độ và tiếp cận nhanh các chủ đề học tập. |
| **Interactive Simulations** | Các mô phỏng 2D/3D trực quan bao gồm:<br>- **LeverSim**: Đòn bẩy lực tích hợp Spring Physics (lực đàn hồi/lò xo vật lý) tạo độ nhún thực tế khi thay đổi tải trọng.<br>- **ElectrificationSim**: Mô phỏng cọ xát nhiễm điện bằng cách kéo thả đũa thủy tinh cọ xát thực tế.<br>- **ParticlesSim & LiquidPressureSim**: Mô phỏng động học chất khí/chất lỏng. | Giúp học sinh trực tiếp thực hành thí nghiệm và tự rút ra quy luật vật lý. |
| **Smart Calculator** | Hộp công cụ giải toán thông minh tích hợp bộ bắt lỗi tính toán dạng Warning Box Đỏ mềm sinh động khi nhập giá trị không hợp lệ. | Giải toán từng bước chi tiết để học sinh hiểu sâu bản chất bài toán. |
| **Advanced Scratchpad** | Bảng vẽ nháp tích hợp chế độ Cục tẩy (eraser màu `#0f172a`), hỗ trợ lưu trữ trạng thái vẽ qua canvas phụ (offscreen canvas) giúp bảo toàn dữ liệu nháp khi thay đổi kích thước hoặc xoay màn hình. | Cho phép ghi chú và nháp công thức trực tiếp trong lúc học lý thuyết. |
| **Interactive Mindmap & Flashcards** | Sơ đồ tư duy kết nối bài học tăng tốc phần cứng qua GPU (`motion.g` và `useMotionValue`), flashcards lật thẻ mượt mà không gây giật lag hoặc layout shift. | Tổng hợp kiến thức và hỗ trợ ghi nhớ nhanh thông tin bài học. |

---

## Công nghệ sử dụng

- **Core Framework:** Next.js, React, TypeScript
- **Styling System:** Tailwind CSS, Vanilla CSS Variables
- **Physics & Animations:** Framer Motion (Spring Physics, Motion Values, AnimatePresence)
- **Icons:** Lucide React
- **Agent Integration:** Antigravity Agent Memory System (Hỗ trợ tối ưu hóa và dọn dẹp AI Slop toàn diện)

---

## Hướng dẫn cài đặt và chạy ứng dụng

### Yêu cầu hệ thống

- Node.js >= 18.0.0
- npm >= 9.0.0

### Các bước cài đặt

1. Clone repository về máy cục bộ:
   ```bash
   git clone https://github.com/ElderOne9977/StudAI.git
   ```

2. Truy cập vào thư mục dự án:
   ```bash
   cd StudAI
   ```

3. Cài đặt các gói phụ thuộc (dependencies):
   ```bash
   npm install
   ```

### Chạy ứng dụng trong môi trường phát triển (Development)

Khởi chạy máy chủ phát triển cục bộ:
```bash
npm run dev
```

Sau khi chạy lệnh, truy cập địa chỉ [http://localhost:3000](http://localhost:3000) trên trình duyệt để trải nghiệm ứng dụng.

### Biên dịch dự án (Build for Production)

Để đóng gói ứng dụng tối ưu hóa cho production:
```bash
npm run build
```

Chạy thử bản production:
```bash
npm run start
```
