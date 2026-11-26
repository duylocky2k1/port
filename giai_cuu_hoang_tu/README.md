# GIẢI CỨU HOÀNG TỬ — game pixel-art (Phaser 3)

Game web 2D dùng cho buổi thuyết trình case study **"Game On! Using Gamification to Engage with Consumers"**.
Người chơi chọn 1 trong 6 nhân vật, vượt 5 chặng, gom 5 bảo vật, đánh bại Rồng Giáo Sư và giải cứu Hoàng tử Campuchia.

## Cách chạy
- **Offline:** mở thẳng `index.html` bằng Chrome (không cần cài gì, không cần server).
- Phím tắt: `F` toàn màn hình · `M` bật/tắt âm thanh · `←` `→` (hoặc PageUp/PageDown của bút trình chiếu) lật slide · `Enter`/`Space` đi tiếp hội thoại.
- Tiến độ tự lưu trong trình duyệt (localStorage). Màn hình chính có nút **CHƠI MỚI** để xoá tiến độ.

## Nhóm cần làm gì? → chỉ sửa `content/content.js`

| Nhãn trong file | Ý nghĩa |
|---|---|
| `[SPEC]` | Nguyên văn từ kịch bản / slide — không tự ý sửa |
| `[PLACEHOLDER]` | **Nhóm điền** (xem danh sách bên dưới) |
| `[ĐỀ XUẤT]` | Soạn nháp thêm — **nhóm duyệt lại** |
| `[SỬA]` | Chỗ đã đổi khác docx theo yêu cầu |

### Cần điền
Chặng 4 (`stage4.doors`) mới có đáp án đúng, **chưa có phương án sai**:

| Cửa | Cần thêm |
|---|---|
| Cửa 1 | ít nhất 1 phương án sai vào `doors[0].options` |
| Cửa 2 | 2 danh sách sai vào `doors[1].lists[1]` và `[2]` |
| Cửa 3 | 2 danh sách sai vào `doors[2].lists[1]` và `[2]` |

Khi chưa đủ, cửa đó hiện nội dung đúng + cảnh báo và nút **BỎ QUA & MỞ CỬA** (không trừ máu).
**Nhớ đổi vị trí đáp án đúng** (`answer`, đếm từ 0) để người chơi không đoán được luôn là số 1:
nếu chuyển danh sách đúng sang vị trí khác trong `lists` thì sửa `answer` theo.
Riêng Cửa 3 có `explain` (slide hiện sau khi trả lời đúng).

```js
// Cửa 1: thêm vào doors[0].options
{ label: 'Giải thưởng thật lớn', slide: { title: 'PHƯƠNG ÁN B', body: 'Nội dung...' } },
// Cửa 2/3: mỗi danh sách là mảng các dòng
lists: [ [ /* danh sách đúng */ ], ['Ý 1', 'Ý 2'], ['Ý 1', 'Ý 2'] ], answer: 0
```

### Cần duyệt
- `boss.questions[i].hints`: 5 gợi ý/câu (theo thứ tự 5 bảo vật) — đang là bản nháp `[ĐỀ XUẤT]`.
- `boss.questions[2]`: câu chữ đã sửa để không mâu thuẫn với câu hỏi Chặng 2.
- `victory.reward`: phần thưởng bí mật (để trống thì không hiện).

## Viết slide
Bài học, phần trình bày và phần giải thích là mảng **slide**; game tự vẽ theo giao diện pixel, không cần ảnh.

```js
// đơn giản nhất
{ title: 'TIÊU ĐỀ', body: 'Đoạn văn...' }
// nhiều khối
{ tag: 'PART 1', title: 'TIÊU ĐỀ', lead: 'Câu dẫn (tùy chọn)', blocks: [
  { type: 'cards', items: [{ title: '01', body: '...' }, { title: '02', body: '...' }] },
  { type: 'banner', text: 'Kết luận', color: 'yellow' },
] }
```
Các loại khối: `cards`, `table`, `list`, `stats`, `phones`, `banner`, `label` — cú pháp và danh sách `icon` ghi ở đầu file `content.js`.
Chữ tự co/giãn cho vừa khung; càng nhiều chữ thì càng nhỏ, nên giữ mỗi slide gọn để dễ đọc khi chiếu.

Câu hỏi trắc nghiệm:
```js
{ q: 'Câu hỏi?', options: ['A..', 'B..', 'C..', 'D..'], answer: 2, explain: [ /* slide, tùy chọn */ ] }
```

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
src/art/              sprite & bối cảnh vẽ bằng code (core, characters, world, props)
src/ui/               nút, hộp thoại, quiz, thanh trạng thái, chuyển cảnh (ui), vẽ slide (slides), khung chặng (stageflow)
src/scenes/           intro, map, stages (chặng 1–3), stages45 (chặng 4–5), boss (Boss + chiến thắng)
src/audio.js          nhạc & hiệu ứng tổng hợp bằng WebAudio (không có file âm thanh)
```
