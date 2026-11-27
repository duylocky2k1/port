/* ==========================================================================
   NỘI DUNG GAME "GIẢI CỨU HOÀNG TỬ"
   Mọi chữ hiển thị trong game nằm ở đây. Sửa file này, KHÔNG cần đụng code.

   Quy ước:
   - [SPEC]        = nguyên văn từ file "KỊCH BẢN GAME CHI TIẾT (2)" / slide nhóm (không tự ý sửa)
   - [PLACEHOLDER] = để trống → game hiện khung "CHƯA CẤU HÌNH NỘI DUNG", nhóm tự điền
   - [ĐỀ XUẤT]     = phần do người lập trình soạn nháp. Nhóm duyệt và sửa.

   SLIDE (dùng cho bài học, phần trình bày, phần giải thích):
     { tag:'PART 1', title:'TIÊU ĐỀ', lead:'câu dẫn (tùy chọn)', blocks:[ ...các khối xếp từ trên xuống... ] }
     Các loại khối:
       { type:'cards', items:[{ head, title, sub, body, foot, pill, icon, img }], cols, arrows, align:'left'|'center', headColor, h }
       { type:'table', cols:['', 'CỘT 1', 'CỘT 2'], rows:[['NHÃN', 'ô', 'ô']], hl:<cột tô xanh>, arrows, colors:[...] }
       { type:'list',  items:['...'] hoặc [{ t:'dòng chính', d:'dòng phụ' }], cols:2, color }
       { type:'stats', title:'...', items:[{ v:'30%', t:'chú thích' }] }
       { type:'phones', items:[{ icon, line, btn, caption }] }
       { type:'banner', text:'...', color:'green'|'yellow'|'dark'|'pink'|'white' }
       { type:'label', text:'...' }
     Slide đơn giản: { title:'...', body:'đoạn văn' }
     img: tên ảnh trong content/slide-images.js (hiện ở đáy thẻ)
     icon: sun, tube, shield, shieldfull, shieldbroken, qr, girl, team, chest, choice, progress, trophy, chat, search, map, bell, star, quiz, heart, hand
   CÂU HỎI: { q:'...', options:['A','B','C','D'], answer:<chỉ số đúng, bắt đầu từ 0>, explain:[slide...] (tùy chọn) }
   ========================================================================== */
window.GAME_CONTENT = {

  title: 'GIẢI CỨU HOÀNG TỬ', // [SPEC]

  // ---------- 6 nhân vật [SPEC] — không đổi tên, màu, vũ khí, chỉ số ----------
  characters: [
    { id: 'ngocanh', name: 'CÔNG CHÚA NGỌC ANH', short: 'NGỌC ANH', title: 'HỌA SĨ CHIẾN BINH', weapon: 'Cọ vẽ thần kỳ', fight: 4, exp: 3,
      skillName: 'MƯA CỌ PHI TIÊU', skill: 'Ném liên hoàn những cây cọ vẽ như phi tiêu về phía đối thủ. Khi trúng mục tiêu, các cây cọ khiến đối thủ bị vẽ bậy khắp người bằng những hình thù và màu sắc kỳ quặc, làm chúng hoang mang và mất tập trung.' },
    { id: 'ngocngan', name: 'CÔNG CHÚA NGỌC NGÂN', short: 'NGỌC NGÂN', title: 'NỮ HOÀNG RAP DISS', weapon: 'Loa phóng thanh', fight: 5, exp: 3,
      skillName: 'RAP BATTLE SONIC BOOM', skill: 'Bắn rap liên tục vào loa phóng thanh, tạo ra những làn sóng âm cực mạnh. Đối thủ bị đẩy lùi, ù tai, mất phương hướng và không thể đứng vững trước tốc độ rap kinh hoàng.' },
    { id: 'ngocgiao', name: 'CÔNG CHÚA NGỌC GIAO', short: 'NGỌC GIAO', title: 'PHÙ THỦY DEADLINE', weapon: 'Đồng hồ báo thức khổng lồ', fight: 4, exp: 4,
      skillName: 'DEADLINE DÍ SÁT', skill: 'Ném đồng hồ báo thức khổng lồ vào đối thủ. Tiếng chuông deadline vang lên khiến kẻ địch hoảng loạn, chạy tán loạn và cuối cùng bị đóng băng trong 3 giây.' },
    { id: 'minhthu', name: 'CÔNG CHÚA MINH THƯ', short: 'MINH THƯ', title: 'GIÁO SƯ TRI THỨC', weapon: 'Xấp bài Journal khoa học', fight: 3, exp: 5,
      skillName: 'TRI THỨC TẤN CÔNG', skill: 'Tung hàng loạt bài Journal khoa học vào mặt đối thủ. Lượng kiến thức khổng lồ khiến kẻ địch choáng váng, đầu óc quay cuồng vì phải tiếp nhận quá nhiều thông tin học thuật cùng lúc.' },
    { id: 'minhhien', name: 'CÔNG CHÚA MINH HIỀN', short: 'MINH HIỀN', title: 'PHÁP SƯ THỐNG KÊ', weapon: 'Máy tính thống kê thần kỳ', fight: 5, exp: 5,
      skillName: 'P-VALUE HỦY DIỆT', skill: 'Bắn hàng loạt con số, công thức và biểu đồ vào đối thủ. Khi máy tính xuất hiện kết quả "p < 0.05", nhân vật kích hoạt đòn đánh chí mạng khiến kẻ địch choáng váng vì không thể bác bỏ giả thuyết không.' },
    { id: 'hoangthien', name: 'CÂY NẤM HOÀNG THIÊN', short: 'HOÀNG THIÊN', title: 'TRIỆU HỒI SƯ ẾCH', weapon: 'Con ếch xanh thần kỳ', fight: 4, exp: 2,
      skillName: 'ẾCH BAY VÔ CỰC', skill: 'Triệu hồi một đàn ếch xanh rồi ném liên hoàn vào mặt đối thủ. Những con ếch bám lên đầu và mặt kẻ địch, che kín tầm nhìn, khiến chúng hoảng loạn và mất khả năng tấn công.' },
  ],

  // ---------- Bước 3: Sắc lệnh [SPEC] ----------
  decree: {
    heading: 'SẮC LỆNH HOÀNG GIA', sub: 'NHIỆM VỤ GIẢI CỨU HOÀNG TỬ',
    paragraphs: [
      'SẮC LỆNH KHẨN CẤP TỪ HOÀNG GIA CAMPUCHIA',
      'Trong một chuyến vi hành bí mật, Hoàng tử Campuchia không may bị bắt cóc bởi RỒNG GIÁO SƯ – một con rồng thông tuệ, sở hữu kho tàng kiến thức khoa học khổng lồ.',
      'Mỗi ngày, Hoàng tử phải đọc 20 BÀI JOURNAL, phân tích từng mô hình nghiên cứu và ghi nhớ vô số lý thuyết phức tạp.',
      'Sau nhiều ngày bị nhấn chìm trong biển kiến thức, Hoàng tử dần kiệt sức, đôi mắt thâm quầng và tinh thần đứng bên bờ vực sụp đổ.',
      'Hoàng gia Campuchia chính thức ban hành sắc lệnh: "CHIÊU MỘ NHỮNG CHIẾN BINH DŨNG CẢM NHẤT!"',
      'Bất kỳ chiến binh nào vượt qua những thử thách tri thức, chiến thắng Rồng Giáo Sư và giải cứu Hoàng tử thành công sẽ nhận được phần thưởng bí mật cùng lời cảm tạ cao quý từ Hoàng gia Campuchia!',
      'HỠI CHIẾN BINH, BẠN ĐÃ SẴN SÀNG LÊN ĐƯỜNG?',
    ],
    button: 'SẴN SÀNG!',
  },

  // ---------- Bước 4: 5 chặng [SPEC] ----------
  stages: [
    { name: 'RỪNG THÔNG THÁI', en: 'FOREST OF WISDOM', diff: 1, mission: 'Những thử thách kiến thức nền tảng, giúp người chơi làm quen với cuộc phiêu lưu.' },
    { name: 'THƯ VIỆN HOÀNG GIA', en: 'ROYAL LIBRARY', diff: 2, mission: 'Thử thách ghi nhớ, hiểu và nhận diện kiến thức đã học.' },
    { name: 'SUỐI THỰC HÀNH', en: 'STREAM OF PRACTICE', diff: 3, mission: 'Những câu hỏi vận dụng kiến thức vào tình huống thực tế.' },
    { name: 'MÊ CUNG SUY LUẬN', en: 'LABYRINTH OF LOGIC', diff: 4, mission: 'Những thử thách đòi hỏi tư duy logic, khả năng phân tích, so sánh và đưa ra quyết định.' },
    { name: 'ĐỈNH NÚI CHÂN LÝ', en: 'SUMMIT OF TRUTH', diff: 5, mission: 'Thử thách tổng hợp toàn bộ kiến thức đã học, yêu cầu người chơi vận dụng những gì đã tích lũy từ 4 chặng trước.' },
  ],
  lair: { name: 'TỔ TRI THỨC', mission: 'Hang ổ của Rồng Giáo Sư. Hoàng tử đang bị giam trong tòa tháp.', startBtn: 'BẮT ĐẦU TRẬN CHIẾN CUỐI CÙNG' },

  // ---------- Bảo vật [SPEC] ----------
  treasures: [
    { name: 'ÁO GIÁP SỨC MẠNH', desc: 'Bảo vật đầu tiên trong hành trình giải cứu Hoàng tử Campuchia.', ordinal: 'ĐẦU TIÊN' },
    { name: 'QUYỂN SÁCH BIẾT TUỐT', desc: 'Bảo vật lưu giữ kho tàng tri thức của Thư Viện Hoàng Gia.', ordinal: 'THỨ HAI' },
    { name: 'TRÁI TIM DŨNG CẢM', desc: 'Biểu tượng của lòng dũng cảm, sự sáng tạo và tinh thần dám thử thách.', ordinal: 'THỨ BA' },
    { name: 'LA BÀN SUY LUẬN', desc: 'Biểu tượng của khả năng phân tích, tư duy logic và đưa ra quyết định đúng đắn.', ordinal: 'THỨ TƯ' },
    { name: 'QUYỀN TRƯỢNG THÔNG TUỆ', desc: 'Bảo vật đại diện cho trí tuệ, sự thấu hiểu và khả năng đưa ra quyết định sáng suốt.', ordinal: 'CUỐI CÙNG' },
  ],

  // ---------- Chặng 1: Rừng Thông Thái [SPEC] ----------
  stage1: {
    npc: 'CÂY THÔNG THÁI',
    greeting: [
      'Ồ! Cuối cùng cũng có một chiến binh dũng cảm đặt chân đến Rừng Thông Thái!',
      'Ta đã chờ đợi rất lâu để tìm ra người có đủ trí tuệ giải cứu Hoàng tử Campuchia.',
      'Nhưng trước khi tiếp tục cuộc hành trình, ngươi phải chứng minh rằng mình xứng đáng!',
      'Để vượt qua khu rừng này, ngươi cần lắng nghe câu chuyện mà ta sắp kể và trả lời chính xác câu hỏi của ta.',
    ],
    challenge: 'THỬ THÁCH 1 – KHÁM PHÁ CASE STUDY', learnBtn: 'BẮT ĐẦU HỌC',
    pageHeading: 'GIỚI THIỆU CASE STUDY',
    pages: [ // [SPEC] 5 slide "PART 1"
      { tag: 'PART 1', title: 'BÀI TOÁN CỦA MARKETER', lead: 'Làm sao để người tiêu dùng chủ động tương tác với thương hiệu?',
        blocks: [
          { type: 'cards', arrows: true, align: 'center', items: [{ title: '01', sub: 'THU HÚT\nSỰ CHÚ Ý' }, { title: '02', sub: 'GIỮ HỌ\nQUAN TÂM' }, { title: '03', sub: 'KHIẾN HỌ\nHÀNH ĐỘNG' }] },
          { type: 'label', text: 'Giải pháp được phân tích trong case study:' },
          { type: 'banner', text: 'GAMIFICATION — TRÒ CHƠI HÓA TRẢI NGHIỆM NGƯỜI TIÊU DÙNG', color: 'green' },
        ] },
      { tag: 'PART 1', title: 'GAMIFICATION LÀ GÌ?', lead: '“Việc sử dụng cơ chế trò chơi và thiết kế trải nghiệm để tương tác với mọi người trên nền tảng số, đồng thời thúc đẩy họ đạt được mục tiêu của mình.” — Gartner',
        blocks: [
          { type: 'label', text: 'Bạn đã từng…?' },
          { type: 'cards', h: 0.8, items: [{ body: 'Để lại đánh giá trên Google Maps để nhận ưu đãi hoặc giảm giá ngay trên hóa đơn?' }, { body: 'Dùng thẻ tích điểm ở quán cà phê — mỗi lần mua đóng một tem, đủ tem thì đổi một ly nước miễn phí?' }] },
          { type: 'banner', text: 'TẤT CẢ NHỮNG CHƯƠNG TRÌNH NÀY ĐỀU LÀ CƠ CHẾ CỦA GAMIFICATION', color: 'green' },
          { type: 'cards', h: 1, items: [
            { title: 'NGHĨA RỘNG', body: 'Mọi tương tác có yếu tố giống trò chơi: thưởng khi xem quảng cáo hoặc mua thêm sản phẩm — thường thấy ở chương trình khách hàng thân thiết.' },
            { title: 'NGHĨA CHẶT', body: 'Có đủ yếu tố quen thuộc của game điện tử: chiến lược, cạnh tranh và cơ hội được ghi nhận thành tích.' }] },
        ] },
      { tag: 'PART 1', title: 'VÌ SAO HẤP DẪN HƠN?',
        blocks: [
          { type: 'table', hl: 2, widths: [0.22, 0.39, 0.39], cols: ['', 'QUẢNG CÁO TRUYỀN THỐNG', 'GAMIFICATION'], colors: ['', '#c8ccd8', '#8ee05a'], rows: [
            ['VAI TRÒ\nNGƯỜI DÙNG', 'Bị động tiếp nhận thông điệp', 'Chủ động chọn tham gia và chọn phần thưởng muốn hướng tới'],
            ['CẢM NHẬN VỀ\nPHẦN THƯỞNG', 'Là một khuyến mãi được trao', 'Là thành tựu mình đã nỗ lực đạt được'],
            ['NHU CẦU\nĐƯỢC ĐÁP ỨNG', 'Hầu như không', 'Tự chủ · Thành tựu · Được ghi nhận'],
          ] },
        ] },
      { tag: 'PART 1', title: 'ỨNG DỤNG THỰC TẾ', lead: 'Cùng một công cụ, nhưng mỗi thương hiệu thiết kế cơ chế theo một mục đích marketing riêng.',
        blocks: [
          { type: 'cards', align: 'center', headColor: '#ffd43a', items: [
            { head: '01', title: 'GIỚI THIỆU\nSẢN PHẨM MỚI', sub: 'M&M’s', img: 'mms', body: 'Tìm chiếc pretzel ẩn giữa hàng trăm viên kẹo - muốn chơi thì phải nhìn kỹ đúng hương vị mới.' },
            { head: '02', title: 'TÌM HIỂU &\nPHẢN HỒI', sub: 'Samsung', img: 'samsung', body: 'Xem video, viết đánh giá, hỏi đáp → nhận huy hiệu → đổi lượt bốc thăm sản phẩm.' },
            { head: '03', title: 'PHÁT TRIỂN\nSẢN PHẨM', sub: 'KIND', img: 'kind', body: 'Cuộc thi Raise the Bar: khách bình chọn hương vị tiếp theo của thương hiệu.' },
            { head: '04', title: 'MUA LẶP LẠI', sub: 'Starbucks', img: 'starbucks', body: 'Tích lũy qua mỗi lần mua, thanh tiến độ tiến dần tới mốc đổi thưởng.' },
            { head: '05', title: 'THÚC ĐẨY\nMUA HÀNG', sub: 'Domino’s · McDonald’s', img: 'mcd', body: 'App tự tạo pizza; Monopoly giải 65 triệu đô; đua xe số trúng Tesla.' }] },
        ] },
      { tag: 'PART 1', title: 'LỢI ÍCH CHO THƯƠNG HIỆU', lead: 'Ba lý do khiến trò chơi là một công cụ xúc tiến hiệu quả — và một điều quan trọng hơn cả.',
        blocks: [
          { type: 'cards', h: 1.1, items: [
            { title: '01  LOYALTY', body: 'Liên tục thưởng mỗi khi khách thực hiện đúng hành vi thương hiệu mong muốn → khách quay lại.', foot: '81% sẽ tham gia nếu trò chơi nằm trong chương trình KHTT' },
            { title: '02  TRUYỀN MIỆNG', body: 'Người chơi kể lại và chia sẻ trên mạng xã hội → nâng cao nhận biết mà không tốn thêm tiền quảng cáo.', foot: 'M&M’s: 25.000 like · 6.000 share · 10.000 bình luận' },
            { title: '03  DỮ LIỆU & TỆP KHÁCH TRẺ', body: 'Người chơi tự nguyện để lại thông tin — và đó là dữ liệu của đúng tệp Gen Z / Millennials.', foot: '68% nam Gen Z xem game là bản sắc · 63% người chơi mobile là nữ' }] },
          { type: 'stats', h: 0.9, title: 'QUAN TRỌNG HƠN CẢ: TRÒ CHƠI THÚC ĐẨY VIỆC MUA HÀNG', items: [
            { v: '60% → 86%', t: 'xu hướng mua cao hơn (86% nếu từng chơi game thương hiệu)' },
            { v: '30%', t: 'doanh thu Domino’s tăng nhờ app tự tạo pizza' },
            { v: '36%', t: 'tỷ lệ chuyển đổi thành hành vi mua — White Castle' },
            { v: '500%', t: 'số lượng đánh giá sản phẩm tăng — Samsung' }] },
        ] },
    ],
    preQuiz: [
      'Giờ thì, chiến binh trẻ tuổi! Ngươi đã lĩnh hội được những kiến thức mà ta truyền đạt chưa?',
      'Ta chỉ có một câu hỏi dành cho ngươi. Nếu trả lời chính xác, ngươi sẽ nhận được bảo vật đầu tiên và được phép tiếp tục hành trình!',
    ],
    quizBtn: 'NHẬN THỬ THÁCH', quizTitle: 'CÂU HỎI CỦA CÂY THÔNG THÁI',
    questions: [ // [SPEC]
      { q: 'Theo case study "Game On!", vì sao một quảng cáo được thiết kế dưới hình thức trò chơi lại hiệu quả hơn quảng cáo truyền thống?',
        options: ['Vì trò chơi có giải thưởng giá trị lớn hơn khuyến mãi thông thường',
          'Vì người tiêu dùng được CHỦ ĐỘNG chọn tham gia, nên nhìn phần thưởng như một thành tựu mình nỗ lực đạt được chứ không phải một quảng cáo',
          'Vì trò chơi có chi phí sản xuất thấp hơn quảng cáo truyền thống',
          'Vì trò chơi tiếp cận được nhiều người hơn trên mạng xã hội'], answer: 1 },
    ],
    correct: ['Xuất sắc! Ngươi đã chứng minh được trí tuệ của mình!', 'Ta công nhận ngươi là một chiến binh xứng đáng. Hãy nhận lấy bảo vật đầu tiên của hành trình!'],
    wrong: ['Ồ, có vẻ ngươi vẫn chưa hiểu hết những điều ta truyền đạt!', 'Hãy suy nghĩ thật kỹ và thử lại một lần nữa!'],
    outro: ['Ngươi đã vượt qua thử thách đầu tiên!', 'Nhưng hành trình giải cứu Hoàng tử vẫn còn rất dài. Hãy mang theo Áo Giáp Sức Mạnh và tiếp tục tiến về Thư Viện Hoàng Gia!', 'Ta tin rằng trí tuệ và lòng dũng cảm sẽ dẫn lối cho ngươi!'],
  },

  // ---------- Chặng 2: Thư Viện Hoàng Gia [SPEC] ----------
  stage2: {
    npc: 'THỦ THƯ HOÀNG GIA',
    greeting: [
      'Ồ! Một vị khách hiếm hoi đã đặt chân đến Thư Viện Hoàng Gia!',
      'Ta nghe nói ngươi đã vượt qua thử thách của Cây Thông Thái và nhận được Áo Giáp Sức Mạnh. Quả là một chiến binh đáng gờm!',
      'Nhưng sức mạnh thôi vẫn chưa đủ để đối đầu với Rồng Giáo Sư đâu!',
      'Muốn tiến xa hơn, ngươi phải hiểu được những lý thuyết quan trọng đang được lưu giữ tại thư viện này.',
      'Ta sẽ truyền đạt những kiến thức ấy cho ngươi. Hãy chú ý lắng nghe, bởi sau đó ta sẽ có một câu hỏi để kiểm tra trí tuệ của ngươi!',
    ],
    challenge: 'THỬ THÁCH 2 – KHÁM PHÁ NHỮNG LÝ THUYẾT HOÀNG GIA', learnBtn: 'BẮT ĐẦU HỌC',
    pageHeading: 'LÝ THUYẾT ĐƯỢC ÁP DỤNG',
    pages: [ // [SPEC] slide "PART 2"
      { tag: 'PART 2', title: 'LÝ THUYẾT ÁP DỤNG', lead: 'Ba lý thuyết của Chương 5 được vận dụng vào cơ chế gamification trong case.',
        blocks: [
          { type: 'table', arrows: true, hl: 2, rowLight: true, widths: [0.3, 0.33, 0.37], cols: ['LÝ THUYẾT (CHƯƠNG 5)', 'CƠ CHẾ GAMIFICATION', 'BẰNG CHỨNG TRONG CASE'], colors: ['#1b2340', '#ffd43a', '#8ee05a'], rows: [
            ['Expectancy Theory\nThuyết kỳ vọng', 'Gắn hành vi muốn khuyến khích với một lợi ích mà người chơi coi trọng', 'Samsung: huy hiệu → lượt bốc thăm — cơ hội trúng thưởng tạo động lực xem video, viết đánh giá'],
            ['Nhu cầu tự chủ, vui chơi\n& thành tích (Murray)', 'Người chơi tự chọn tham gia, thử thách đủ thú vị và có dấu hiệu ghi nhận thành tựu', 'M&M’s: tự đi tìm chiếc pretzel ẩn — tìm được là một thành tích nhỏ; huy hiệu Samsung ghi nhận nỗ lực'],
            ['Consumer Involvement\nMức độ gắn kết', 'Đưa sản phẩm / thông điệp vào chính nhiệm vụ mà người chơi phải làm', 'Samsung: nhiệm vụ xoay quanh tìm hiểu và phản hồi sản phẩm → tăng Product Involvement'],
          ] },
        ] },
    ],
    preQuiz: [
      'Khá lắm! Ngươi đã được tiếp cận những lý thuyết quan trọng nhất của thư viện này.',
      'Nhưng liệu ngươi có thực sự hiểu và ghi nhớ những điều ta vừa truyền đạt?',
      'Ta có một câu hỏi dành cho ngươi. Nếu trả lời chính xác, ta sẽ trao cho ngươi một bảo vật vô cùng quý giá!',
    ],
    quizBtn: 'NHẬN THỬ THÁCH', quizTitle: 'CÂU HỎI CỦA THỦ THƯ HOÀNG GIA',
    questions: [ // [SPEC] — phương án lấy theo bản đã sửa trong docx (bỏ các chữ cũ "Fresh start mindset", "Utilitarian need")
      { q: 'Samsung tặng huy hiệu cho người dùng khi họ xem video, viết đánh giá hoặc tham gia hỏi đáp; huy hiệu sau đó được dùng làm lượt dự bốc thăm. Cơ chế này minh họa rõ nhất lý thuyết nào trong Chương 5?',
        options: ['Thuyết kỳ vọng (Expectancy Theory)', 'Nhu cầu đạt được thành tựu (Murray)', 'Consumer Involvement', 'Cả 3 thuyết trên'], answer: 3,
        explain: [{ title: 'GIẢI THÍCH', body: 'Samsung tặng huy hiệu khi người dùng xem video, viết đánh giá hoặc tham gia hỏi đáp về sản phẩm. Huy hiệu ghi nhận việc họ đã hoàn thành nhiệm vụ, qua đó đáp ứng nhu cầu đạt thành tích.\n\nTheo thuyết kỳ vọng, việc dùng huy hiệu để dự bốc thăm tạo thêm động lực tham gia vì người dùng có cơ hội trúng thưởng.\n\nĐồng thời, các nhiệm vụ giúp họ chủ động tìm hiểu và phản hồi về sản phẩm, qua đó có thể tăng Product Involvement (Consumer involvement).' }] },
    ],
    correct: ['Xuất sắc! Quả nhiên ngươi không chỉ có sức mạnh mà còn sở hữu một trí tuệ đáng nể!', 'Ngươi đã vượt qua thử thách của Thư Viện Hoàng Gia!', 'Ta sẽ trao cho ngươi bảo vật thứ hai – QUYỂN SÁCH BIẾT TUỐT!'],
    wrong: ['Ôi chao! Có vẻ ngươi đã bỏ sót một vài trang sách quan trọng rồi!', 'Kiến thức cần được nghiền ngẫm, chứ không thể chỉ đọc lướt qua!', 'Hãy suy nghĩ thêm một lần nữa!'],
    outro: ['Ngươi đã chứng minh rằng mình xứng đáng sở hữu Quyển Sách Biết Tuốt!', 'Nhưng nhớ kỹ, chỉ nắm vững lý thuyết thôi là chưa đủ. Một chiến binh thực thụ còn phải biết vận dụng kiến thức vào thực tế!', 'Hãy tiếp tục cuộc hành trình đến Suối Thực Hành, nơi những thử thách mới đang chờ đợi ngươi!'],
  },

  // ---------- Chặng 3: Suối Thực Hành [SPEC] ----------
  stage3: {
    npc: 'TINH LINH NƯỚC',
    greeting: [
      'Ồ! Một chiến binh dũng cảm đã đặt chân đến Suối Thực Hành!',
      'Ta nghe nói ngươi đã vượt qua Rừng Thông Thái và Thư Viện Hoàng Gia, thu thập được hai bảo vật quý giá!',
      'Nhưng kiến thức sẽ chẳng có ý nghĩa gì nếu ngươi không biết cách biết ứng dụng nó!',
      'Để vượt qua dòng suối này, ta có một thử thách dành cho ngươi!',
    ],
    questionTitle: 'CÂU HỎI CỦA TINH LINH NƯỚC',
    question: 'Chọn một sản phẩm chưa có chiến lược trò chơi hóa rõ ràng và thiết kế một chiến dịch sử dụng trò chơi để thu hút người dùng. Hãy phát huy khả năng sáng tạo bằng cách thiết kế một hoạt động có mức độ tham gia cao hơn việc đơn thuần trao huy hiệu cho người mua thêm sản phẩm.',
    presentBtn: 'TRÌNH BÀY Ý TƯỞNG',
    presentation: [ // [SPEC] 8 slide SHIELD UP (vẽ lại theo giao diện game)
      { tag: 'SHIELD UP', title: 'VÌ SAO CHỌN KEM CHỐNG NẮNG?',
        blocks: [
          { type: 'cards', h: 1.6, items: [
            { icon: 'sun', title: 'THỊ TRƯỜNG', body: '- Ví điện tử, sàn TMĐT đã có game riêng\n- Kem chống nắng: chỉ có minigame ngắn hạn\n→ Chưa có chiến lược gamification rõ ràng' },
            { icon: 'girl', title: 'NGƯỜI DÙNG', body: '- Ai cũng có kem chống nắng\n- Nhưng thoa quá ít và quên thoa lại\n- Vì không nhìn thấy lúc kem hết tác dụng' }] },
          { type: 'banner', text: 'Vấn đề không phải mua – mà là dùng đúng và đều đặn', color: 'yellow' },
        ] },
      { tag: 'SHIELD UP', title: 'Ý TƯỞNG: SHIELD UP – GIỮ KHIÊN',
        blocks: [
          { type: 'cards', cols: 1, h: 1.6, color: '#ffe0ec', items: [
            { icon: 'shield', body: 'Mỗi người chơi có một chiếc khiên' },
            { icon: 'hand', body: 'Chăm da đúng cách → khiên được nạp đầy' },
            { icon: 'shieldbroken', body: 'Quên thoa lại → khiên yếu dần' }] },
          { type: 'label', text: '*Khiên là hình ảnh ẩn dụ, không đo chỉ số chống UV thực tế', align: 'right' },
          { type: 'banner', text: 'Biến việc chống nắng thành trò chơi giữ khiên mỗi ngày', color: 'yellow' },
        ] },
      { tag: 'SHIELD UP', title: 'CÁCH CHƠI – BẮT ĐẦU',
        blocks: [
          { type: 'phones', items: [
            { icon: 'qr', line: 'QUÉT MÃ', btn: 'BẮT ĐẦU', caption: 'B1: Quét QR trên tuýp kem' },
            { icon: 'girl', line: 'DA DẦU · DA KHÔ · NHẠY CẢM', btn: 'TẠO NHÂN VẬT', caption: 'B2: Tạo nhân vật, chọn loại da' },
            { icon: 'shieldfull', line: 'KHIÊN 100%', btn: 'ĐÃ THOA', caption: 'B3: Thoa kem → bấm Đã thoa → bật khiên' }] },
        ] },
      { tag: 'SHIELD UP', title: 'CÁCH CHƠI – MỖI NGÀY',
        blocks: [
          { type: 'phones', items: [
            { icon: 'shieldbroken', line: 'Khiên còn 25%! Nạp lại nhé', btn: 'NHẮC NHỞ', caption: 'B4: Khiên giảm dần, app nhắc' },
            { icon: 'shieldfull', line: 'Shield bar 100%  +10', btn: 'NẠP KHIÊN', caption: 'B5: Thoa lại → Nạp khiên +10 điểm' },
            { icon: 'quiz', line: 'QUIZ 1 PHÚT', btn: 'LÊN CẤP!', caption: 'B6: Quiz 1 phút → lên cấp' }] },
        ] },
      { tag: 'SHIELD UP', title: 'CÁCH CHƠI – CÙNG BẠN BÈ',
        blocks: [
          { type: 'phones', items: [
            { icon: 'team', line: 'KHIÊN ĐỘI', btn: 'MỜI BẠN', caption: 'B7: Lập Đội Khiên 3-5 bạn' },
            { icon: 'sun', line: 'BOSS NẮNG GẮT', btn: 'ĐÁNH BOSS', caption: 'B8: Cùng đánh Boss ngày nắng gắt' },
            { icon: 'chest', line: 'RƯƠNG QUÀ', btn: 'NHẬN QUÀ!', caption: 'B9: Giữ khiên đủ ngày → mở rương quà' }] },
        ] },
      { tag: 'SHIELD UP', title: 'VÌ SAO SHIELD UP CÓ THỂ HIỆU QUẢ?',
        blocks: [
          { type: 'cards', cols: 2, h: 2, color: '#ffffff', items: [
            { icon: 'choice', title: 'Được tự chọn', body: 'Người chơi tự chọn nhiệm vụ hợp lịch của mình', pill: 'Tự chủ' },
            { icon: 'progress', title: 'Thấy mình tiến bộ', body: 'Khiên đầy, lên cấp, chuỗi ngày tăng mỗi ngày', pill: 'Thành tựu' },
            { icon: 'team', title: 'Có bạn đồng hành', body: 'Đội Khiên nhắc nhau, cùng giữ thói quen', pill: 'Gắn kết' },
            { icon: 'chest', title: 'Quà đáng mong chờ', body: 'Quà thiết thực, càng chăm da đều càng nhận lớn', pill: 'Kỳ vọng' }] },
          { type: 'banner', text: 'Thưởng người dùng đúng – không thưởng người mua nhiều', color: 'yellow' },
        ] },
      { tag: 'SHIELD UP', title: 'ĐỘNG LỰC THAM GIA',
        blocks: [
          { type: 'cards', h: 1.25, items: [
            { icon: 'heart', title: 'ĐỘNG LỰC BÊN TRONG', body: '- Vui khi giữ khiên, lên cấp\n- Thấy mình chăm da tốt hơn\n- Vui khi cùng bạn bè chơi' },
            { icon: 'chest', title: 'ĐỘNG LỰC BÊN NGOÀI', body: '- Điểm thưởng, skin khiên\n- Tuýp kem mini, voucher, mũ\n- Chuyến đi biển cho đội top' }] },
          { type: 'cards', arrows: true, h: 0.9, align: 'center', headColor: '#d9a066', items: [
            { head: 'NGÀY ĐẦU', body: 'Tò mò, muốn nhận quà' },
            { head: 'TUẦN ĐẦU', body: 'Giữ chuỗi ngày, không muốn làm đội mất điểm' },
            { head: 'SAU 1 THÁNG', body: 'Thoa kem thành thói quen tự nhiên' }] },
          { type: 'banner', text: 'Quà kéo người chơi vào – niềm vui và thói quen giữ họ ở lại', color: 'yellow' },
        ] },
      { tag: 'SHIELD UP', title: 'THƯƠNG HIỆU NHẬN ĐƯỢC GÌ?',
        blocks: [
          { type: 'cards', h: 2, items: [
            { icon: 'trophy', title: 'KỲ VỌNG', body: '♥ Khách dùng đúng → hài lòng → mua lại\n• Tăng tương tác với thương hiệu\n• Hiểu khách hàng: loại da, thói quen\n• Hình ảnh thương hiệu đồng hành mỗi ngày' },
            { dark: true, title: 'SCORE – ĐO LƯỜNG', body: '★ Lượt tham gia\n★ Tỷ lệ hoàn thành nhiệm vụ\n★ Tỷ lệ quay lại chơi\n★ Mức độ tương tác\n★ Mức hiểu sản phẩm (điểm quiz)\n★ Đổi ưu đãi & mua lại' }] },
          { type: 'label', text: '*Chiến dịch giả định – KPI là đề xuất đo lường, không phải số liệu thực tế', align: 'center' },
        ] },
    ],
    verdict: 'ĐÁNH GIÁ HOÀN TẤT – ĐẠT YÊU CẦU!',
    praise: [
      'Ồ! Thật là một ý tưởng thú vị!',
      'Ngươi đã biết cách vận dụng kiến thức về trò chơi hóa để tạo ra một hoạt động có tính tương tác và thu hút người dùng!',
      'Ta đặc biệt ấn tượng với cách ngươi biến người tham gia từ những người mua hàng thông thường thành một phần của trải nghiệm trò chơi!',
      'Ta công nhận phần trình bày của ngươi đã vượt qua thử thách!',
      'Ngươi xứng đáng nhận được bảo vật thứ ba – TRÁI TIM DŨNG CẢM!',
    ],
    outro: ['Ngươi đã chứng minh được khả năng sáng tạo và vận dụng kiến thức của mình!', 'Nhưng hành trình giải cứu Hoàng tử vẫn chưa kết thúc!', 'Phía trước là Mê Cung Suy Luận, nơi những thử thách logic đang chờ đợi ngươi!', 'Hãy mang theo Trái Tim Dũng Cảm và tiếp tục tiến về phía trước!'],
  },

  // ---------- Chặng 4: Mê Cung Suy Luận [SPEC Bước 8] ----------
  stage4: {
    npc: 'NGƯỜI CANH CỬA',
    title: 'MÊ CUNG SUY LUẬN',
    greeting: [
      'Ồ! Cuối cùng cũng có một chiến binh đủ dũng cảm đặt chân đến Mê Cung Suy Luận!',
      'Ta nghe nói ngươi đã vượt qua ba chặng thử thách và thu thập được ba bảo vật quý giá!',
      'Nhưng trí tuệ thực sự không chỉ nằm ở việc ghi nhớ kiến thức hay đưa ra những ý tưởng sáng tạo!',
      'Ngươi còn phải biết phân tích, đánh giá và phân biệt đâu là quyết định đúng đắn!',
      'Trước mặt ngươi là ba cánh cửa. Mỗi cánh cửa chứa đựng một câu hỏi về nghệ thuật trò chơi hóa trong tiếp thị.',
      'Chỉ khi vượt qua cả ba, ngươi mới có thể tìm thấy lối ra và nhận được La Bàn Suy Luận!',
    ],
    startBtn: 'BẮT ĐẦU THỬ THÁCH',
    okText: 'CHÍNH XÁC!', badText: 'HÃY SUY NGHĨ LẠI!',
    // Mỗi cửa chỉ có MỘT đáp án đúng (answer = chỉ số, bắt đầu từ 0). Nhớ đổi vị trí đáp án đúng khi đã điền đủ phương án.
    doors: [
      { name: 'CỬA 1 – BÍ MẬT TRÒ CHƠI HAY', cardTitle: 'THẾ NÀO LÀ GAME “HAY”?', symbol: 'star', kind: 'options',
        q: 'Điều gì tạo nên một trò chơi ‘hay’?',
        options: [
          { label: 'MONEY TALKS' },
          { label: 'CHỊ THẮNG RỒI NHƯNG EM KHÔNG BAO GIỜ THUA' },
          { label: 'THỎA MÃN NHU CẦU TÂM LÝ CƠ BẢN\nCƠ CHẾ GAME THỰC THỤ\nKẾT HỢP HAI ĐỘNG CƠ\nGẮN VỚI BRAND\nHIỆU ỨNG IKEA', // [SPEC] thẻ C trong slide CÂU 5-2 (trang 15 PDF); slide giải thích 5 yếu tố ở dưới — đáp án C

            slide: { tag: 'CÂU 5-2', title: 'THẾ NÀO LÀ GAME “HAY”?', lead: 'Năm yếu tố làm nên một trò chơi hiệu quả trong tiếp thị.',
              blocks: [{ type: 'cards', align: 'center', headColor: '#ff9fce', items: [
                { head: '01', title: 'THỎA MÃN NHU CẦU TÂM LÝ CƠ BẢN', body: 'Sự tự chủ\nĐáp ứng nhu cầu thành tựu\nSự gắn kết' },
                { head: '02', title: 'CƠ CHẾ GAME THỰC THỤ', body: 'Tích hợp đầy đủ 3 yếu tố: chiến lược, sự cạnh tranh và cơ hội được công nhận thành tích' },
                { head: '03', title: 'KẾT HỢP HAI ĐỘNG CƠ', body: 'Bên trong: giải trí, cảm xúc, niềm vui thử thách\nBên ngoài: quà tặng, ưu đãi, điểm thưởng' },
                { head: '04', title: 'GẮN VỚI BRAND', body: 'Trò chơi phải hỗ trợ mục tiêu marketing của thương hiệu' },
                { head: '05', title: 'HIỆU ỨNG IKEA', body: 'Tạo nhân vật hoặc phần quà được cá nhân hóa — người chơi tự tay làm nên thì càng trân trọng' }] }] } },
          { label: 'DỪNG SHARE ĐI!!!' },
        ],
        answer: 2 },
      { name: 'CỬA 2 – QUY TẮC VÀNG', cardTitle: 'NÊN LÀM GÌ ĐỂ GAME HIỆU QUẢ?', symbol: 'check', kind: 'options',
        q: 'Hãy lập danh sách những điều nên làm để trò chơi hóa trong tiếp thị đạt hiệu quả.',
        options: [
          { label: 'NÃY CHỊ ĐANG LÀM KHÁCH EM NHÌN GÌ CHỊ ĐÓ MAI' },
          { label: 'HÔM NAY ĐÔNG ĐỦ CẢ NHỈ?' },
          { label: 'EM KHÔNG CÓ ƯỚC MƠ HẢ?' },
          { label: 'XÁC ĐỊNH MỤC TIÊU TIẾP THỊ\nĐẶT LUẬT CHƠI RÕ RÀNG\nDÙNG PHẦN THƯỞNG PHÙ HỢP' }, // [SPEC] đáp án D (bản 3)
        ],
        answer: 3,
        // [SPEC] slide "NÊN LÀM" – hiện sau khi trả lời đúng
        explain: [{ tag: 'CÂU 5-2', title: 'NÊN LÀM', lead: 'DO’s — 10 nguyên tắc để trò chơi hóa đạt hiệu quả', blocks: [
          { type: 'list', cols: 2, h: 2.4, items: [            { t: 'Xác định mục tiêu marketing trước khi thiết kế trò chơi' },
            { t: 'Tạo sự liên quan giữa trò chơi và sản phẩm' },
            { t: 'Đặt luật chơi rõ ràng: cách tham gia, tính điểm, điều kiện thưởng, thời hạn' },
            { t: 'Tạo thử thách vừa sức — đủ thú vị nhưng không gây bỏ cuộc' },
            { t: 'Đơn giản hóa thao tác, nhất là tại cửa hàng hoặc trên mobile' },
            { t: 'Cho người chơi cảm giác chủ động: chọn thử thách, cách chơi, phần thưởng' },
            { t: 'Thể hiện tiến trình và sự ghi nhận: điểm, cấp độ, phản hồi tức thì' },
            { t: 'Dùng phần thưởng phù hợp với nhóm người chơi và mức độ tham gia' },
            { t: 'Tạo cơ hội tương tác xã hội: bình chọn, chia sẻ, mời bạn bè' },
            { t: 'Đo cả mức độ tham gia lẫn kết quả marketing, không chỉ đếm lượt chơi' }] }] }] },
      { name: 'CỬA 3 – CẠM BẪY TRÒ CHƠI HÓA', cardTitle: 'CẦN TRÁNH LÀM GÌ ĐỂ GAME HIỆU QUẢ?', symbol: 'warn', kind: 'options',
        q: 'Hãy lập danh sách những điều cần tránh để trò chơi hóa trong tiếp thị đạt hiệu quả.',
        options: [
          { label: 'EM CÀNG NÓI EM CÀNG SAI!' },
          { label: 'KHÔNG LÀM 1 TRÒ CHƠI ÁP DỤNG CHO TẤT CẢ\nKHÔNG BIẾN TRÒ CHƠI THÀNH MỘT QUẢNG CÁO KÉO DÀI\nKHÔNG THU THẬP DỮ LIỆU THIẾU MINH BẠCH' }, // [SPEC] đáp án B (bản 3)
          { label: 'BÔNG ĐẸP QUÁ KÌA' },
          { label: 'CHỊ LÀ MỘT NGƯỜI AN TOÀN' },
        ],
        answer: 1,
        // [SPEC] slide "CẦN TRÁNH" – hiện sau khi trả lời đúng
        explain: [{ tag: 'CÂU 5-2', title: 'CẦN TRÁNH', lead: 'DON’Ts - 7 lỗi thường gặp khi làm gamification', blocks: [
          { type: 'list', cols: 2, h: 2.4, items: [
            { t: 'Một trò chơi cho mọi nhóm nhân khẩu học', d: 'Không đáp ứng đúng nhu cầu, không tạo được động lực tham gia' },
            { t: 'Biến trò chơi thành một quảng cáo kéo dài', d: 'Chỉ liên tục xem nội dung bán hàng thì người chơi sẽ mất hứng thú' },
            { t: 'Thiết kế chỉ để thúc đẩy mua nhiều hơn', d: 'Mọi phần thưởng đều đòi mua thêm → cảm giác bị ép mua' },
            { t: 'Luật chơi phức tạp hoặc thiếu minh bạch', d: 'Điều kiện khó hiểu làm giảm niềm tin và khiến người chơi bỏ cuộc' },
            { t: 'Quá dễ hoặc quá khó', d: 'Quá dễ thì nhanh nhàm chán; quá khó thì gây nản lòng' },
            { t: 'Phần thưởng không thực tế', d: 'Trải nghiệm, cảm giác thành tựu và sự ghi nhận cũng cần hấp dẫn' },
            { t: 'Thu thập dữ liệu thiếu minh bạch', d: 'Đừng đòi quá nhiều thông tin cá nhân mà không trao lại giá trị tương xứng' }] },
          { type: 'banner', text: 'Nguyên tắc chung: trò chơi phải đáng chơi trước khi đáng thưởng.', color: 'dark' }] }] },
    ],
    vault: [
      'Không thể tin được! Ngươi đã vượt qua cả ba cánh cửa của Mê Cung Suy Luận!',
      'Ngươi không chỉ hiểu điều gì tạo nên một trò chơi hấp dẫn mà còn biết những nguyên tắc cần áp dụng và các sai lầm cần tránh khi trò chơi hóa trong tiếp thị!',
      'Ta công nhận trí tuệ và khả năng suy luận của ngươi!',
      'Giờ đây, hãy nhận lấy bảo vật thứ tư – LA BÀN SUY LUẬN!',
    ],
    outro: [
      'Ngươi đã chứng minh rằng mình đủ khả năng vượt qua những cạm bẫy của tư duy!',
      'Chỉ còn một thử thách cuối cùng trước khi ngươi có thể tiến đến Tổ Tri Thức!',
      'Hãy đến Đỉnh Núi Chân Lý. Ở đó, toàn bộ trí tuệ, sự sáng tạo và bản lĩnh của ngươi sẽ được kiểm chứng!',
      'Chúc ngươi may mắn, chiến binh!',
    ],
  },

  // ---------- Chặng 5: Đỉnh Núi Chân Lý [SPEC Bước 9] ----------
  stage5: {
    npc: 'HIỀN TRIẾT BÔNG TUYẾT',
    title: 'ĐỈNH NÚI CHÂN LÝ',
    greeting: [
      'Ồ! Cuối cùng cũng có một chiến binh đặt chân đến Đỉnh Núi Chân Lý!',
      'Ta đã dõi theo hành trình của ngươi từ Rừng Thông Thái đến Mê Cung Suy Luận.',
      'Ngươi đã chứng minh được lòng dũng cảm, khả năng sáng tạo và trí tuệ của mình!',
      'Nhưng muốn đối đầu với Rồng Giáo Sư, ngươi phải thấu hiểu một chân lý quan trọng: Không phải mọi người đều có cùng động lực khi tham gia một trò chơi!',
      'Trước mặt ngươi là hai Bông Tuyết Chân Lý. Mỗi bông tuyết cất giữ một thử thách về cách trò chơi hóa tác động đến những nhóm người khác nhau.',
      'Chỉ khi giải mã được cả hai, ngươi mới xứng đáng sở hữu Quyền Trượng Thông Tuệ!',
    ],
    startBtn: 'BẮT ĐẦU THỬ THÁCH',
    okText: 'CHÍNH XÁC!', badText: 'CHƯA CHÍNH XÁC!',
    flakes: [
      { name: 'BÔNG TUYẾT 1 – CHÂN LÝ NHÂN KHẨU HỌC',
        q: 'Trò chơi hóa có hiệu quả với mọi nhóm nhân khẩu học hay không (xét theo độ tuổi, thu nhập, giới tính và trình độ học vấn)?',
        options: ['Có. Một thiết kế trò chơi có thể mang lại hiệu quả giống nhau cho mọi nhóm.',
          'Gamification có thể hiệu quả với nhiều nhóm nhưng cần điều chỉnh theo nhu cầu, động cơ và đặc điểm của từng nhóm khách hàng.',
          'Không. Gamification chỉ phù hợp với người trẻ và Gen Z.',
          'Gamification chỉ hiệu quả với khách hàng có thu nhập cao và thường xuyên chơi game.'], answer: 1,
        explain: [
          { tag: 'CÂU 5-3', title: 'GIẢI THÍCH', body: 'Gamification có thể thu hút nhiều nhóm khách hàng, nhưng mức độ hiệu quả không giống nhau.\n\nDoanh nghiệp cần nghiên cứu đặc điểm nhân khẩu học kết hợp với động cơ, nhu cầu và sở thích để lựa chọn cơ chế trò chơi phù hợp.' },
          { tag: 'CÂU 5-3', title: 'HIỆU QUẢ VỚI MỌI NHÓM?', lead: 'Gamification áp dụng được cho nhiều nhóm khách hàng — nhưng cùng một trò chơi không hiệu quả như nhau với tất cả mọi người.',
            blocks: [
              { type: 'cards', h: 2, headColor: '#9fd8ff', items: [
                { head: 'ĐỘ TUỔI', body: 'Ảnh hưởng mức quen thuộc công nghệ và thời gian tham gia.\n→ Nhóm quen công nghệ: app, bảng xếp hạng, chia sẻ\n→ Nhóm ít quen: giao diện đơn giản, chữ dễ đọc' },
                { head: 'THU NHẬP', body: 'Ảnh hưởng mức quan tâm đến phần thưởng.\n→ Đa dạng hóa phần thưởng: voucher, sản phẩm, danh hiệu\n→ Hạn chế yêu cầu mua hàng không cần thiết' },
                { head: 'GIỚI TÍNH', body: 'Không dùng làm tiêu chí duy nhất để dự đoán sở thích.\n→ Không mặc định nam thích cạnh tranh, nữ thích đơn giản\n→ Cho chọn: cá nhân / hợp tác / cạnh tranh' },
                { head: 'TRÌNH ĐỘ HỌC VẤN', body: 'Liên quan khả năng tiếp nhận hướng dẫn và xử lý thông tin.\n→ Luật rõ ràng, hạn chế thuật ngữ phức tạp\n→ Thử thách nhiều cấp độ, có hình minh họa' }] },
              { type: 'banner', text: 'Gamification không chỉ cần hấp dẫn — mà còn phải PHÙ HỢP với nhu cầu và đặc điểm của khách hàng mục tiêu.', color: 'green' }] },
        ] },
      { name: 'BÔNG TUYẾT 2 – THIẾT KẾ TRÒ CHƠI HÓA',
        q: 'Khi tiếp thị đến các phân khúc nhân khẩu học khác nhau, doanh nghiệp cần cân nhắc những yếu tố thiết kế trò chơi nào?',
        options: ['Tăng giá trị giải thưởng để mọi nhóm khách hàng đều muốn tham gia.',
          'Sử dụng cùng một giao diện, cấp độ và cơ chế trò chơi cho tất cả khách hàng.',
          'Điều chỉnh độ khó, thời lượng, giao diện, phần thưởng, cách tương tác và khả năng tiếp cận theo đặc điểm của từng phân khúc.',
          'Chỉ cần dựa vào độ tuổi và giới tính để xác định sở thích chơi game.'], answer: 2,
        doneLabel: 'HOÀN THÀNH CÂU 2',
        explain: [
          { tag: 'CÂU 5-3', title: 'GIẢI THÍCH THEO BỐN YẾU TỐ NHÂN KHẨU HỌC',
            blocks: [
              { type: 'cards', cols: 2, h: 2, headColor: '#9fd8ff', items: [
                { head: 'AGE – ĐỘ TUỔI', body: 'Cân nhắc khả năng sử dụng công nghệ, giao diện, độ khó và thời lượng.' },
                { head: 'INCOME – THU NHẬP', body: 'Lựa chọn phần thưởng phù hợp và hạn chế rào cản về chi phí tham gia.' },
                { head: 'GENDER – GIỚI TÍNH', body: 'Tránh định kiến và cho người chơi tự lựa chọn hình thức tham gia.' },
                { head: 'EDUCATION – HỌC VẤN', body: 'Sử dụng ngôn ngữ dễ hiểu, hướng dẫn rõ ràng và thử thách có nhiều cấp độ.' }] },
              { type: 'banner', text: 'Kết luận: Không có một thiết kế trò chơi duy nhất phù hợp với tất cả khách hàng.', color: 'yellow' }] },
          { tag: 'CÂU 5-3', title: '7 YẾU TỐ THIẾT KẾ', lead: 'Cần cân nhắc gì khi thiết kế gamification cho từng phân khúc?',
            blocks: [
              { type: 'cards', cols: 4, h: 1, headColor: '#ffd43a', items: [
                { head: 'GAME DIFFICULTY', title: 'Độ khó', body: 'Thử thách phù hợp khả năng người chơi — không quá dễ, không quá khó' },
                { head: 'GAME DURATION', title: 'Thời lượng', body: 'Nhiệm vụ ngắn hay dài tùy thời gian và mức độ tham gia của khách' },
                { head: 'USER EXPERIENCE', title: 'Trải nghiệm', body: 'Giao diện đơn giản, hướng dẫn rõ ràng, dễ thao tác trên mọi thiết bị' },
                { head: 'MOTIVATION', title: 'Động lực', body: 'Kết hợp niềm vui, cạnh tranh, cảm giác thành tựu, kết nối xã hội và phần thưởng' }] },
              { type: 'cards', cols: 3, h: 0.8, items: [
                { title: 'REWARD SYSTEM — Hệ thống phần thưởng', body: 'Đa dạng hóa phần thưởng, bảo đảm minh bạch và phù hợp với giá trị mà khách hàng quan tâm' },
                { title: 'PERSONALIZATION — Cá nhân hóa', body: 'Cho phép người chơi lựa chọn nhiệm vụ, cấp độ hoặc hình thức tham gia phù hợp' },
                { title: 'ACCESSIBILITY — Khả năng tiếp cận', body: 'Giảm rào cản về công nghệ, chi phí, ngôn ngữ và thao tác' }] }] },
          { tag: 'CÂU 5-3', title: 'SHIELD UP — GIỮ KHIÊN', lead: 'Để minh họa cách điều chỉnh Gamification theo từng phân khúc, nhóm áp dụng vào chiến dịch kem chống nắng SHIELD UP được đề xuất tại câu CS 5-1.',
            blocks: [
              { type: 'cards', h: 1.7, headColor: '#ff9fce', items: [
                { head: 'NHÓM 1 — SINH VIÊN', body: '• Nhiệm vụ nhóm và thử thách ngắn\n• Bảng xếp hạng — cạnh tranh & ghi nhận thành tích\n• Khuyến khích chia sẻ kết quả lên mạng xã hội\n• Thưởng: sản phẩm dùng thử, voucher, vật phẩm trong game' },
                { head: 'NHÓM 2 — NHÂN VIÊN VĂN PHÒNG', body: '• Nhiệm vụ ngắn, dễ hoàn thành\n• Thời gian tham gia linh hoạt\n• Tích hợp nhắc nhở và theo dõi tiến trình cá nhân\n• Thưởng: voucher hoặc sản phẩm chăm sóc da tiện dụng' },
                { head: 'NHÓM 3 — LAO ĐỘNG NGOÀI TRỜI', body: '• Giao diện rõ ràng, thao tác đơn giản\n• Hướng dẫn bằng hình ảnh, hạn chế nhiệm vụ phức tạp\n• Cung cấp thông tin hữu ích về thói quen chống nắng\n• Thưởng: sản phẩm chống nắng dùng thử, vật phẩm thiết thực' }] },
              { type: 'stats', h: 0.75, title: 'ĐO LƯỜNG & TỐI ƯU: so sánh kết quả giữa các nhóm để biết cơ chế nào phù hợp hơn', items: [
                { v: 'Participation', t: 'Rate' }, { v: 'Completion', t: 'Rate' }, { v: 'Retention', t: 'Rate' }, { v: 'Engagement', t: '' }, { v: 'Conversion', t: 'Rate' }] },
              { type: 'label', text: 'Đây là các đề xuất cần kiểm chứng với người dùng thực tế, không phải sở thích cố định của từng nhóm khách hàng.', align: 'center' }] },
          { tag: 'CÂU 5-3', title: 'THÔNG ĐIỆP CHÍNH – PLAYER FIT',
            blocks: [{ type: 'banner', h: 1, text: '“Gamification không phải là tạo một trò chơi cho tất cả mọi người, mà là thiết kế trải nghiệm phù hợp với nhu cầu và động cơ của từng nhóm khách hàng.”', color: 'white' }] },
        ] },
    ],
    solved: [
      'Xuất sắc! Ngươi đã giải mã thành công cả hai Bông Tuyết Chân Lý!',
      'Ngươi đã hiểu rằng để trò chơi hóa thực sự hiệu quả, người thiết kế phải thấu hiểu sự khác biệt giữa những nhóm người tham gia!',
      'Không có một cách thiết kế duy nhất phù hợp với tất cả mọi người. Điều quan trọng là biết điều chỉnh trải nghiệm để đáp ứng nhu cầu và động lực của từng nhóm!',
      'Ta công nhận trí tuệ và sự thông thái của ngươi!',
      'Đã đến lúc trao cho ngươi bảo vật cuối cùng!',
    ],
    allFive: 'ĐÃ THU THẬP ĐỦ 5 BẢO VẬT HUYỀN THOẠI!',
    outro: [
      'Chiến binh dũng cảm, ngươi đã hoàn thành tất cả thử thách và thu thập đủ năm bảo vật huyền thoại!',
      'Giờ đây, con đường dẫn đến Tổ Tri Thức đã được mở!',
      'Rồng Giáo Sư đang chờ đợi ngươi ở phía trước, cùng với Hoàng tử Campuchia đang bị giam giữ!',
      'Hãy sử dụng tất cả trí tuệ và sức mạnh đã tích lũy để giành chiến thắng cuối cùng!',
      'Vận mệnh của Hoàng tử đang nằm trong tay ngươi!',
    ],
    completeExtra: 'ĐÃ THU THẬP ĐỦ 5 BẢO VẬT!',
    nextBtn: 'TIẾN ĐẾN TỔ TRI THỨC',
  },

  // ---------- Boss: Rồng Giáo Sư [SPEC Bước 10] ----------
  boss: {
    name: 'RỒNG GIÁO SƯ',
    intro: [
      'KHÔNG THỂ NÀO! SAO NGƯƠI CÓ THỂ ĐẶT CHÂN ĐẾN TỔ TRI THỨC CỦA TA?!',
      'Không ngờ lại có một chiến binh đủ khả năng vượt qua tất cả những thử thách mà ta đã đặt ra!',
      'Nhưng đừng vội mừng! Muốn giải cứu Hoàng tử Campuchia, ngươi còn phải vượt qua thử thách cuối cùng của ta!',
      'Ta sẽ đưa ra 5 CÂU HỎI TRI THỨC!',
      'Nếu trả lời chính xác tất cả, ta sẽ trả tự do cho Hoàng tử!',
      'NHƯNG NẾU NGƯƠI THẤT BẠI...',
      'Ngươi sẽ bị nhốt cùng Hoàng tử Campuchia và phải đọc 20 BÀI JOURNAL KHÁC NHAU MỖI NGÀY, CHO ĐẾN HẾT ĐỜI!',
      'HAHAHAHA!',
    ],
    battleTitle: 'FINAL BOSS BATTLE!', battleSub: '5 THỬ THÁCH TRI THỨC – 1 CƠ HỘI GIẢI CỨU HOÀNG TỬ!', battleBtn: 'BẮT ĐẦU CHIẾN ĐẤU',
    quizTitle: 'THỬ THÁCH TRI THỨC – CÂU',
    okText: 'CHÍNH XÁC!', badText: 'SAI RỒI!',
    hitToast: 'CHÍNH XÁC! SỨC MẠNH TRI THỨC ĐÃ GÂY SÁT THƯƠNG!',
    missToast: 'SAI RỒI! NGƯƠI ĐÃ BỊ TẤN CÔNG BỞI 20 BÀI JOURNAL!',
    retryBtn: 'THỬ LẠI',
    hintBtn: 'ĐÃ HIỂU',
    // hints: 5 gợi ý theo thứ tự 5 bảo vật (Áo giáp, Sách, Trái tim, La bàn, Quyền trượng) – [ĐỀ XUẤT], nhóm duyệt lại
    questions: [
      { q: 'Theo định nghĩa của Gartner được trích trong case, gamification là gì?', // [SPEC]
        options: ['Việc tạo ra các trò chơi điện tử để quảng bá sản phẩm của thương hiệu',
          'Việc sử dụng cơ chế trò chơi và thiết kế trải nghiệm để tương tác với mọi người trên nền tảng số, đồng thời thúc đẩy họ đạt được mục tiêu của mình',
          'Việc tặng quà cho khách hàng sau mỗi lần mua hàng', 'Việc hợp tác với các game thủ nổi tiếng để quảng cáo sản phẩm'], answer: 1,
        hints: ['Định nghĩa của Gartner không nói về việc LÀM RA trò chơi điện tử, mà về việc DÙNG cơ chế trò chơi.',
          'Nhớ lại slide "Gamification là gì?": định nghĩa có hai vế — tương tác với mọi người trên nền tảng số, và giúp họ đạt mục tiêu.',
          'Tặng quà sau mỗi lần mua chỉ là khuyến mãi; hợp tác với game thủ chỉ là quảng cáo. Cả hai đều thiếu "cơ chế trò chơi".',
          'Hãy loại phương án C và D trước: đó là khuyến mãi và quảng cáo thông thường.',
          'Từ khóa cần tìm: "cơ chế trò chơi" + "thiết kế trải nghiệm" + "đạt được mục tiêu".'] },
      { q: 'Theo Matthew Pierce (CEO Versus Systems), điều gì khiến não bộ xử lý trò chơi khác với quảng cáo truyền thống?', // [SPEC]
        options: ['Trò chơi có âm thanh và hình ảnh sinh động hơn', 'Trò chơi xuất hiện trên điện thoại nên dễ tiếp cận hơn',
          'Người dùng được tự chọn tham gia và chọn phần thưởng mình muốn hướng tới, nên nhìn phần thưởng như thành tựu mình nỗ lực đạt được', 'Trò chơi thường có giải thưởng lớn hơn'], answer: 2,
        hints: ['Hãy nghĩ về VAI TRÒ của người dùng: trong quảng cáo họ bị động, còn trong trò chơi thì sao?',
          'Slide "Vì sao hấp dẫn hơn?": phần thưởng được cảm nhận như "thành tựu mình đã nỗ lực đạt được" thay vì "một khuyến mãi được trao".',
          'Âm thanh, hình ảnh hay giải thưởng lớn thì quảng cáo cũng có thể có. Điểm khác biệt nằm ở tâm lý người chơi.',
          'Hãy loại phương án A và D trước: hình ảnh sinh động hay giải thưởng lớn không làm não bộ xử lý khác đi.',
          'Từ khóa: TỰ CHỌN tham gia + phần thưởng là THÀNH TỰU.'] },
      { q: 'Samsung tặng huy hiệu khi người dùng xem video, viết đánh giá, tham gia hỏi đáp; huy hiệu đổi thành lượt bốc thăm sản phẩm. Cơ chế này minh họa rõ nhất lý thuyết nào?', // cập nhật theo bản docx (Câu 3/5)
        options: ['Thuyết kỳ vọng (Expectancy Theory)',
          'Nhu cầu thuộc về (Need to belong)', 'Tư duy khởi đầu mới (Fresh start mindset)', 'Nhu cầu khác biệt (Need for uniqueness)'], answer: 0,
        hints: ['Hãy tập trung vào phần "đổi huy hiệu lấy lượt bốc thăm": người dùng cố gắng vì điều gì?',
          'Slide "Lý thuyết áp dụng": lý thuyết nào gắn hành vi muốn khuyến khích với một lợi ích mà người chơi coi trọng?',
          'Người dùng xem video, viết đánh giá vì họ tin rằng hành động đó dẫn tới cơ hội trúng thưởng.',
          'Hãy loại phương án C và D trước: "khởi đầu mới" và "khác biệt" không liên quan đến việc đổi huy hiệu lấy phần thưởng.',
          'Từ khóa: KỲ VỌNG rằng hành động → kết quả mong muốn.'] },
      { q: 'Đâu là lỗi nghiêm trọng nhất trong thiết kế gamification?', // [SPEC]
        options: ['Trò chơi có nhiều cấp độ khác nhau', 'Trò chơi cho phép người chơi chia sẻ thành tích lên mạng xã hội',
          'Mọi phần thưởng đều yêu cầu khách hàng mua thêm sản phẩm, khiến trò chơi trở thành công cụ ép mua', 'Trò chơi hiển thị rõ luật chơi và điều kiện nhận thưởng'], answer: 2,
        hints: ['Lỗi nghiêm trọng là lỗi khiến người chơi mất niềm tin và cảm thấy bị lợi dụng.',
          'Slide "Cần tránh": lỗi số 03 nói gì về phần thưởng?',
          'Nhiều cấp độ, chia sẻ thành tích, luật chơi rõ ràng đều là những điều NÊN làm.',
          'Hãy loại phương án A và D trước: cả hai đều nằm trong danh sách DO’s.',
          'Nguyên tắc chung: trò chơi phải đáng chơi trước khi đáng thưởng.'] },
      { q: 'Khi thiết kế gamification cho các phân khúc khác nhau, phát biểu nào ĐÚNG về yếu tố giới tính?', // [SPEC]
        options: ['Nam giới thích cạnh tranh nên hãy thiết kế bảng xếp hạng cho nam, trò chơi đơn giản cho nữ', 'Không cần quan tâm đến giới tính vì 63% người chơi game di động là nữ',
          'Không nên dùng giới tính làm tiêu chí duy nhất để dự đoán sở thích; nên thiết kế bao quát và cho người chơi tự chọn hình thức tham gia (cá nhân / hợp tác / cạnh tranh)', 'Chỉ nên nhắm đến nam giới Gen Z vì 68% xem game là một phần bản sắc'], answer: 2,
        hints: ['Cẩn thận với những phương án mang định kiến giới.',
          'Slide "Hiệu quả với mọi nhóm?": giới tính không nên là tiêu chí duy nhất để dự đoán sở thích.',
          'Một số liệu đúng (63%, 68%) không có nghĩa là kết luận rút ra từ nó cũng đúng.',
          'Hãy loại phương án A và D trước: cả hai đều suy đoán sở thích chỉ dựa trên giới tính.',
          'Từ khóa: thiết kế BAO QUÁT + cho người chơi TỰ CHỌN hình thức tham gia.'] },
    ],
    // chữ bay theo tuyệt chiêu từng nhân vật [SPEC]
    attackWords: { ngocngan: ['Trên Cao', 'Bớt đẳng cấp'], ngocgiao: ['Tới deadline rồi!', 'Nộp bài chưa?'], minhthu: ['Zhang et al.,'],
      ngocanh: ['Vẽ bậy rồi!', 'Màu gì đây?'], // [ĐỀ XUẤT] chờ nhóm duyệt
      minhhien: ['p < 0.05!', 'Bác bỏ H₀!'], // [ĐỀ XUẤT] chờ nhóm duyệt
      hoangthien: ['Ộp ộp!', 'Ếch bay!'] }, // [ĐỀ XUẤT] chờ nhóm duyệt
    journalWords: ['DOI', 'ABSTRACT', 'LITERATURE REVIEW', 'ZHANG ET AL.'],
    gameOver: ['HAHAHA! TRI THỨC CỦA NGƯƠI VẪN CHƯA ĐỦ ĐỂ CHIẾN THẮNG TA!', 'GIỜ THÌ HÃY CHUẨN BỊ ĐỌC 20 BÀI JOURNAL MỖI NGÀY ĐI!'],
    gameOverBtn: 'THỬ THÁCH LẠI!',
    defeatTitle: 'BẠN ĐÃ CHIẾN THẮNG!',
    defeat: [
      'KHÔNG THỂ TIN ĐƯỢC! NGƯƠI ĐÃ VƯỢT QUA CẢ 5 THỬ THÁCH TRI THỨC CỦA TA!',
      'Ta chưa từng nghĩ rằng có một chiến binh vừa dũng cảm, vừa sáng tạo, lại sở hữu trí tuệ đáng nể đến vậy!',
      'Ngươi hoàn toàn xứng đáng giải cứu Hoàng tử Campuchia!',
      'Nhưng hãy nhớ kỹ một điều...',
      'Tri thức không chỉ để vượt qua thử thách hay đánh bại kẻ thù.',
      'Hãy sử dụng quyền năng và những kiến thức ngươi đã học được để phát triển các công trình nghiên cứu, khám phá những điều mới mẻ và góp phần xây dựng một thế giới loài người tốt đẹp hơn!',
    ],
    princeName: 'HOÀNG TỬ CAMPUCHIA',
    prince: [
      'Cuối cùng ta cũng được tự do!',
      'Cảm ơn chiến binh dũng cảm đã giải cứu ta khỏi 20 bài Journal mỗi ngày!',
      'Ta sẽ không bao giờ quên lòng dũng cảm và trí tuệ của ngươi!',
      'Hãy cùng ta về đất nước Campuchia, ta sẽ hậu tạ ngươi chu đáo',
    ],
  },

  // ---------- Màn chiến thắng [SPEC Bước 10] ----------
  victory: {
    heading: 'BẠN ĐÃ GIẢI CỨU THÀNH CÔNG HOÀNG TỬ CAMPUCHIA!',
    sub: 'HÀNH TRÌNH KẾT THÚC – TRI THỨC CÒN MÃI!',
    summary: { char: 'Nhân vật đã sử dụng', stages: 'Tổng số chặng hoàn thành', boss: 'Tổng số câu hỏi Final Boss đã vượt qua', treasures: 'Số bảo vật đã thu thập', result: 'Kết quả', resultText: 'GIẢI CỨU THÀNH CÔNG' },
    endBtn: 'KẾT THÚC HÀNH TRÌNH',
    endAction: 'end', // 'end' = màn hình kết thúc, 'title' = quay về giao diện chính
    message: 'TRI THỨC KHÔNG CHỈ LÀ SỨC MẠNH ĐỂ CHIẾN THẮNG, MÀ CÒN LÀ CHÌA KHÓA ĐỂ KIẾN TẠO MỘT THẾ GIỚI TỐT ĐẸP HƠN.',
    completed: 'GAME COMPLETED – THE PRINCE HAS BEEN RESCUED!',
    reward: '', // tùy chọn: phần thưởng bí mật (để trống thì không hiện)
  },
};
