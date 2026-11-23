# GIẢI CỨU HOÀNG TỬ — game pixel-art (Phaser 3)

Game web 2D dùng cho buổi thuyết trình case study **"Game On! Using Gamification to Engage with Consumers"**.
Người chơi chọn 1 trong 6 nhân vật, vượt 5 chặng, gom 5 bảo vật, đánh bại Rồng Giáo Sư và giải cứu Hoàng tử Campuchia.

## Cách chạy
- **Offline:** mở thẳng `index.html` bằng Chrome (không cần cài gì, không cần server).
- Phím tắt: `F` toàn màn hình · `M` bật/tắt âm thanh.
- Tiến độ tự lưu trong trình duyệt (localStorage). Màn hình chính có nút **CHƠI MỚI** để xoá tiến độ.

## Nhóm cần làm gì? → chỉ sửa `content/content.js`
Mọi chữ trong game nằm trong file đó. Có 3 loại nội dung (đánh dấu trong file):

| Nhãn | Ý nghĩa |
|---|---|
| `[SPEC]` | Nguyên văn từ kịch bản — không sửa |
| `[PLACEHOLDER]` | **Nhóm điền**: trang Case Study (Chặng 1), trang Lý thuyết (Chặng 2), câu hỏi trắc nghiệm Chặng 1 & 2, phần trình bày SHIELD UP (Chặng 3), `victory.reward` |
| `[ĐỀ XUẤT]` | Phần kịch bản chưa có (Chặng 4, 5, Boss) — đề xuất theo file Game On, nhóm duyệt / sửa |

Ví dụ điền trang kiến thức (`stage1.pages`):
```js
pages: [
  { title: 'GIỚI THIỆU CASE STUDY', body: 'Nội dung...' },
  { title: 'PHÂN TÍCH TÌNH HUỐNG',  body: 'Nội dung...' },
],
```
Ví dụ câu hỏi (`stage1.questions`), `answer` đếm từ 0:
```js
questions: [{ q: 'Câu hỏi?', options: ['A..', 'B..', 'C..', 'D..'], answer: 2, hint: 'Gợi ý khi trả lời sai' }],
```
Nếu một mục còn trống, game hiện khung **"CHƯA CẤU HÌNH NỘI DUNG"** kèm nút "BỎ QUA & ĐI TIẾP" để vẫn thử được luồng game.
Chữ dài tự co nhỏ cho vừa khung; nên giữ mỗi trang ≤ ~600 ký tự cho dễ đọc trên máy chiếu.

## Chế độ thử nhanh (dev)
Thêm `?dev=1` sau địa chỉ: hiện chữ DEV, phím `N` bỏ qua chặng hiện tại, và có thể nhảy thẳng tới cảnh:
`index.html?dev=1&scene=Stage3Stream&char=minhthu&done=2`
(`scene`: Title, CharacterSelect, Decree, MapScene, Stage1Forest, Stage2Library, Stage3Stream, Stage4Maze, Stage5Summit, BossLair, Victory, GameOver · `char`: ngocanh, ngocngan, ngocgiao, minhthu, minhhien, hoangthien · `done`: số chặng đã xong). Chế độ này không ghi lưu tiến độ.

## Cấu trúc
```
index.html            nạp script theo thứ tự (không dùng ES module để chạy được từ file://)
content/content.js    TOÀN BỘ nội dung chữ
vendor/phaser.min.js  Phaser 3.80.1
assets/fonts/         VT323 (có tiếng Việt)
src/art/              sprite & bối cảnh vẽ bằng code (core.js, characters.js, world.js)
src/ui/               nút, hộp thoại, bảng phân trang, quiz, thanh trạng thái, chuyển cảnh, khung luồng chặng
src/scenes/           intro (Title/Chọn nhân vật/Sắc lệnh/Game Over), map, stages, boss
src/audio.js          nhạc & hiệu ứng tổng hợp bằng WebAudio (không có file âm thanh)
```
