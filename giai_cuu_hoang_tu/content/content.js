/* ==========================================================================
   NỘI DUNG GAME "GIẢI CỨU HOÀNG TỬ"
   Mọi chữ hiển thị trong game nằm ở đây. Sửa file này, KHÔNG cần đụng code.

   Quy ước:
   - [SPEC]     = nguyên văn từ file "KỊCH BẢN GAME CHI TIẾT" (không tự ý sửa)
   - [PLACEHOLDER] = để trống / null → game hiện khung "CHƯA CẤU HÌNH NỘI DUNG", nhóm tự điền
   - [ĐỀ XUẤT] = phần spec chưa có (Chặng 4, 5, Boss), đề xuất bám theo file Game On. Nhóm duyệt và sửa.
   Mỗi trang kiến thức: { title:'...', body:'...' }  (body dài sẽ tự co chữ cho vừa khung)
   Mỗi câu hỏi: { q:'...', options:['A','B','C','D'], answer:<chỉ số đúng, bắt đầu từ 0>, hint:'gợi ý ngắn khi sai' }
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
      'Trong một chuyến vi hành bí mật, Hoàng tử Campuchia không may bị bắt cóc bởi RỒNG GIÁO SƯ – một con rồng đáng sợ, sở hữu kho tàng kiến thức khoa học khổng lồ.',
      'Tên rồng độc ác đã giam giữ Hoàng tử trong TỔ TRI THỨC, nơi chất đầy những cuốn sách và bài nghiên cứu khoa học.',
      'Mỗi ngày, Hoàng tử bị ép phải đọc 20 BÀI JOURNAL, phân tích từng mô hình nghiên cứu và ghi nhớ vô số lý thuyết phức tạp.',
      'Sau nhiều ngày bị nhấn chìm trong biển kiến thức, Hoàng tử dần kiệt sức, đôi mắt thâm quầng và tinh thần đứng bên bờ vực sụp đổ.',
      'Hoàng gia Campuchia chính thức ban hành sắc lệnh: "CHIÊU MỘ NHỮNG CHIẾN BINH DŨNG CẢM NHẤT!"',
      'Bất kỳ chiến binh nào vượt qua những thử thách tri thức, đánh bại Rồng Giáo Sư và giải cứu Hoàng tử thành công sẽ nhận được phần thưởng bí mật cùng lời cảm tạ cao quý từ Hoàng gia Campuchia!',
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
  lair: { name: 'TỔ TRI THỨC', mission: 'Hang ổ của Rồng Giáo Sư. Hoàng tử đang bị giam trong tòa tháp.' },

  // ---------- Bảo vật ----------
  treasures: [
    { name: 'ÁO GIÁP SỨC MẠNH', desc: 'Bảo vật đầu tiên trong hành trình giải cứu Hoàng tử Campuchia.', ordinal: 'ĐẦU TIÊN' }, // [SPEC]
    { name: 'QUYỂN SÁCH BIẾT TUỐT', desc: 'Bảo vật lưu giữ kho tàng tri thức của Thư Viện Hoàng Gia.', ordinal: 'THỨ HAI' }, // [SPEC]
    { name: 'TRÁI TIM DŨNG CẢM', desc: 'Biểu tượng của lòng dũng cảm, sự sáng tạo và tinh thần dám thử thách.', ordinal: 'THỨ BA' }, // [SPEC]
    { name: 'LA BÀN SUY LUẬN', desc: 'Chiếc la bàn chỉ đường cho những ai biết cân nhắc trước khi hành động.', ordinal: 'THỨ TƯ' }, // [ĐỀ XUẤT]
    { name: 'VƯƠNG MIỆN CHÂN LÝ', desc: 'Vương miện dành cho người hiểu rõ từng người chơi và từng nhu cầu.', ordinal: 'THỨ NĂM' }, // [ĐỀ XUẤT]
  ],

  // ---------- Chặng 1: Rừng Thông Thái [SPEC hội thoại, PLACEHOLDER học thuật] ----------
  stage1: {
    npc: 'CÂY THÔNG THÁI',
    greeting: [
      'Ồ! Cuối cùng cũng có một chiến binh dũng cảm đặt chân đến Rừng Thông Thái!',
      'Ta đã chờ đợi rất lâu để tìm ra người có đủ trí tuệ giải cứu Hoàng tử Campuchia khỏi nanh vuốt của Rồng Tri Thức.',
      'Nhưng trước khi tiếp tục cuộc hành trình, ngươi phải chứng minh rằng mình xứng đáng!',
      'Để vượt qua khu rừng này, ngươi cần lắng nghe câu chuyện mà ta sắp kể và trả lời chính xác câu hỏi của ta.',
    ],
    challenge: 'THỬ THÁCH 1 – KHÁM PHÁ CASE STUDY', learnBtn: 'BẮT ĐẦU HỌC',
    // [PLACEHOLDER] 3 trang gợi ý: GIỚI THIỆU CASE STUDY / PHÂN TÍCH TÌNH HUỐNG / KIẾN THỨC RÚT RA
    pages: [],
    preQuiz: [
      'Giờ thì, chiến binh trẻ tuổi! Ngươi đã lĩnh hội được những kiến thức mà ta truyền đạt chưa?',
      'Ta chỉ có một câu hỏi dành cho ngươi. Nếu trả lời chính xác, ngươi sẽ nhận được bảo vật đầu tiên và được phép tiếp tục hành trình!',
    ],
    quizBtn: 'NHẬN THỬ THÁCH', quizTitle: 'CÂU HỎI CỦA CÂY THÔNG THÁI',
    questions: [], // [PLACEHOLDER] ví dụ: [{ q:'...', options:['A..','B..','C..','D..'], answer:0, hint:'...' }]
    correct: ['Xuất sắc! Ngươi đã chứng minh được trí tuệ của mình!', 'Ta công nhận ngươi là một chiến binh xứng đáng. Hãy nhận lấy bảo vật đầu tiên của hành trình!'],
    wrong: ['Ồ, có vẻ ngươi vẫn chưa hiểu hết những điều ta truyền đạt!', 'Hãy suy nghĩ thật kỹ và thử lại một lần nữa!'],
    outro: ['Ngươi đã vượt qua thử thách đầu tiên!', 'Nhưng hành trình giải cứu Hoàng tử vẫn còn rất dài. Hãy mang theo Áo Giáp Sức Mạnh và tiếp tục tiến về Thư Viện Hoàng Gia!', 'Ta tin rằng trí tuệ và lòng dũng cảm sẽ dẫn lối cho ngươi!'],
  },

  // ---------- Chặng 2: Thư Viện Hoàng Gia [SPEC hội thoại, PLACEHOLDER học thuật] ----------
  stage2: {
    npc: 'THỦ THƯ HOÀNG GIA',
    greeting: [
      'Ồ! Một vị khách hiếm hoi đã đặt chân đến Thư Viện Hoàng Gia!',
      'Ta nghe nói ngươi đã vượt qua thử thách của Cây Thông Thái và nhận được Áo Giáp Sức Mạnh. Quả là một chiến binh đáng gờm!',
      'Nhưng sức mạnh thôi vẫn chưa đủ để đối đầu với Rồng Tri Thức đâu!',
      'Muốn tiến xa hơn, ngươi phải hiểu được những lý thuyết quan trọng đang được lưu giữ tại thư viện này.',
      'Ta sẽ truyền đạt những kiến thức ấy cho ngươi. Hãy chú ý lắng nghe, bởi sau đó ta sẽ có một câu hỏi để kiểm tra trí tuệ của ngươi!',
    ],
    challenge: 'THỬ THÁCH 2 – KHÁM PHÁ NHỮNG LÝ THUYẾT HOÀNG GIA', learnBtn: 'BẮT ĐẦU HỌC',
    // [PLACEHOLDER] 4 trang gợi ý: GIỚI THIỆU LÝ THUYẾT / NỘI DUNG CỐT LÕI / ỨNG DỤNG / TỔNG KẾT
    pages: [],
    preQuiz: [
      'Khá lắm! Ngươi đã được tiếp cận những lý thuyết quan trọng nhất của thư viện này.',
      'Nhưng liệu ngươi có thực sự hiểu và ghi nhớ những điều ta vừa truyền đạt?',
      'Ta có một câu hỏi dành cho ngươi. Nếu trả lời chính xác, ta sẽ trao cho ngươi một bảo vật vô cùng quý giá!',
    ],
    quizBtn: 'NHẬN THỬ THÁCH', quizTitle: 'CÂU HỎI CỦA THỦ THƯ HOÀNG GIA',
    questions: [], // [PLACEHOLDER]
    correct: ['Xuất sắc! Quả nhiên ngươi không chỉ có sức mạnh mà còn sở hữu một trí tuệ đáng nể!', 'Ngươi đã vượt qua thử thách của Thư Viện Hoàng Gia!', 'Ta sẽ trao cho ngươi bảo vật thứ hai – QUYỂN SÁCH BIẾT TUỐT!'],
    wrong: ['Ôi chao! Có vẻ ngươi đã bỏ sót một vài trang sách quan trọng rồi!', 'Kiến thức cần được nghiền ngẫm, chứ không thể chỉ đọc lướt qua!', 'Hãy suy nghĩ thêm một lần nữa!'],
    outro: ['Ngươi đã chứng minh rằng mình xứng đáng sở hữu Quyển Sách Biết Tuốt!', 'Nhưng nhớ kỹ, chỉ nắm vững lý thuyết thôi là chưa đủ. Một chiến binh thực thụ còn phải biết vận dụng kiến thức vào thực tế!', 'Hãy tiếp tục cuộc hành trình đến Suối Thực Hành, nơi những thử thách mới đang chờ đợi ngươi!'],
  },

  // ---------- Chặng 3: Suối Thực Hành [SPEC; phần trình bày PLACEHOLDER] ----------
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
    // [PLACEHOLDER] mỗi trang: { title, body }. Gợi ý: sản phẩm / ý tưởng / cơ chế / hoạt động / động lực / hiệu quả kỳ vọng
    presentation: [],
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

  // ---------- Chặng 4: Mê Cung Suy Luận [ĐỀ XUẤT – theo CS 5-2 "GOOD MOVE or GAME OVER" trong file Game On] ----------
  stage4: {
    npc: 'CÚ MÈO LOGIC',
    greeting: [
      'Hú! Hú! Chào mừng chiến binh đến Mê Cung Suy Luận!',
      'Ở đây, mỗi ngã rẽ là một quyết định thiết kế của một trò chơi tiếp thị. Chọn đúng thì cổng mê cung mở ra, chọn sai thì lạc đường!',
      'Hãy phán xét từng tình huống: đó là GOOD MOVE, GAME OVER, hay CẦN CÂN NHẮC?',
    ],
    challenge: 'THỬ THÁCH 4 – GOOD MOVE hay GAME OVER?', learnBtn: 'BẮT ĐẦU',
    pages: [
      { title: 'LUẬT CỦA MÊ CUNG', body: 'Mỗi cổng là một tình huống thiết kế game marketing.\n\nGOOD MOVE: quyết định tốt.\nGAME OVER: quyết định phản tác dụng.\nCẦN CÂN NHẮC: có mặt tốt và mặt rủi ro.\n\nChọn đúng để mở cổng. Chọn sai mất 1 trái tim.' },
    ],
    preQuiz: ['Cổng đầu tiên đã hiện ra phía trước. Hãy suy luận thật cẩn thận!'],
    quizBtn: 'VÀO MÊ CUNG', quizTitle: 'GOOD MOVE or GAME OVER?',
    questions: [
      { q: 'Tình huống: Người chơi muốn tham gia phải mua 5 sản phẩm.', options: ['GOOD MOVE', 'GAME OVER', 'CẦN CÂN NHẮC'], answer: 1, hint: 'Hãy nghĩ đến rào cản tham gia. Trải nghiệm này có biến thành ép mua không?' },
      { q: 'Tình huống: Người chơi có quyền chọn thử thách và theo dõi tiến trình của mình.', options: ['GOOD MOVE', 'GAME OVER', 'CẦN CÂN NHẮC'], answer: 0, hint: 'Quyền lựa chọn và phản hồi tiến trình đáp ứng nhu cầu tâm lý nào?' },
      { q: 'Tình huống: Chỉ người xếp hạng nhất nhận phản hồi; những người còn lại không biết mình tiến bộ ra sao.', options: ['GOOD MOVE', 'GAME OVER', 'CẦN CÂN NHẮC'], answer: 1, hint: 'Những người chơi còn lại có cảm nhận được năng lực của mình không?' },
      { q: 'Tình huống: Người chơi vốn rất thích hoạt động này, nhưng thương hiệu chỉ liên tục tăng quà vật chất.', options: ['GOOD MOVE', 'GAME OVER', 'CẦN CÂN NHẮC'], answer: 2, hint: 'Phần thưởng bên ngoài đôi khi làm suy giảm cảm giác tự chủ trong một số trường hợp.' },
    ],
    correct: ['Chính xác! Cổng mê cung đã mở ra!', 'Trí tuệ của ngươi đủ sáng để soi đường. Hãy nhận lấy La Bàn Suy Luận!'],
    wrong: ['Hú! Ngươi đã rẽ nhầm hướng rồi!', 'Hãy cân nhắc lại cho kỹ trước khi chọn.'],
    outro: ['Ngươi đã thoát khỏi Mê Cung Suy Luận!', 'Phía trước là Đỉnh Núi Chân Lý, nơi ngươi phải hiểu từng người chơi.', 'Hãy mang theo La Bàn Suy Luận và leo lên đỉnh núi!'],
  },

  // ---------- Chặng 5: Đỉnh Núi Chân Lý [ĐỀ XUẤT – theo CS 5-3 "KNOW YOUR PLAYER" trong file Game On] ----------
  stage5: {
    npc: 'HIỀN TRIẾT MÂY',
    greeting: [
      'Chào mừng chiến binh đã leo đến Đỉnh Núi Chân Lý!',
      'Ở đây ta không hỏi ngươi về trò chơi. Ta hỏi ngươi về NGƯỜI CHƠI.',
      'Cùng một trò chơi, nhưng không phải ai cũng muốn chơi như nhau. Hãy mở ba thẻ người chơi và quan sát thật kỹ!',
    ],
    challenge: 'THỬ THÁCH 5 – KNOW YOUR PLAYER', learnBtn: 'MỞ THẺ NGƯỜI CHƠI',
    pages: [
      { title: 'THẺ 1: SINH VIÊN', body: 'Người chơi giả định: sinh viên.\n\nCó thể hợp với nhiệm vụ nhóm ngắn, chia sẻ và thử thách nhanh.\n\nCần kiểm tra: chi phí tham gia, thời lượng, giao diện, hướng dẫn.\n\n(Gợi ý giả định, cần được thử nghiệm với người chơi thật.)' },
      { title: 'THẺ 2: NHÂN VIÊN VĂN PHÒNG', body: 'Người chơi giả định: nhân viên văn phòng.\n\nCó thể hợp với nhắc nhở cá nhân, ít thao tác và chơi nhẹ nhàng.\n\nCần kiểm tra: thời gian rảnh, mức độ thuận tiện, độ rõ của luật chơi.\n\n(Gợi ý giả định, cần được thử nghiệm với người chơi thật.)' },
      { title: 'THẺ 3: NGƯỜI LAO ĐỘNG NGOÀI TRỜI', body: 'Người chơi giả định: người lao động ngoài trời.\n\nCó thể cần giao diện rõ ràng, thao tác đơn giản và phần thưởng thiết thực.\n\nCần kiểm tra: mức độ quen thuộc với công nghệ, rào cản tham gia.\n\n(Gợi ý giả định, cần được thử nghiệm với người chơi thật.)' },
      { title: 'BỐN GÓC NHÌN – KHÔNG ĐỊNH KIẾN', body: 'AGE: khả năng sử dụng, thời lượng, giao diện, hướng dẫn.\nINCOME: chi phí tham gia, rào cản mua, phần thưởng thiết thực.\nGENDER: không suy đoán sở thích từ giới tính, cho phép lựa chọn.\nEDUCATION: độ rõ của luật, ngôn ngữ, thử thách và hướng dẫn.\n\nNhân khẩu học chỉ là góc nhìn khởi đầu. Hãy thử nghiệm với nhóm mục tiêu.' },
    ],
    preQuiz: ['Ngươi đã quan sát đủ ba thẻ và bốn góc nhìn.', 'Giờ hãy trả lời câu hỏi cuối cùng của ta!'],
    quizBtn: 'NHẬN THỬ THÁCH', quizTitle: 'CÂU HỎI CỦA HIỀN TRIẾT MÂY',
    questions: [
      { q: 'Khi thiết kế gamification cho các nhóm người chơi khác nhau, nên làm gì?', options: ['Dùng một thiết kế duy nhất vì ai cũng thích như nhau', 'Suy đoán sở thích dựa trên giới tính của người chơi', 'Xem nhân khẩu học là điểm khởi đầu, cân nhắc nhu cầu và giá trị, rồi thử nghiệm với nhóm mục tiêu', 'Bắt người chơi mua sản phẩm trước rồi mới được chơi'], answer: 2, hint: 'Hãy nhớ câu: nhân khẩu học chỉ là góc nhìn khởi đầu.' },
    ],
    correct: ['Chính xác! Ngươi đã nhìn thấy người chơi đằng sau trò chơi.', 'Hãy nhận lấy Vương Miện Chân Lý!'],
    wrong: ['Chưa đúng rồi, chiến binh.', 'Hãy nhìn lại ba thẻ người chơi và thử lần nữa.'],
    outro: ['Ngươi đã lên đến đỉnh núi!', 'Con đường cuối cùng dẫn vào Tổ Tri Thức đã mở ra.', 'Hãy đi đi, và giải cứu Hoàng tử!'],
  },

  // ---------- Boss: Rồng Giáo Sư [ĐỀ XUẤT – theo FINAL BOSS trong file Game On] ----------
  boss: {
    name: 'RỒNG GIÁO SƯ',
    intro: [
      { who: 'RỒNG GIÁO SƯ', t: 'Grừ... Kẻ nào dám đặt chân vào Tổ Tri Thức của ta?' },
      { who: 'RỒNG GIÁO SƯ', t: 'Ta sẽ cho ngươi thấy một trò chơi thiếu trải nghiệm: chỉ có một vòng quay thưởng, nhận voucher rồi rời đi!' },
      { who: 'RỒNG GIÁO SƯ', t: 'Nếu ngươi biết cách cải thiện nó bằng kiến thức đã học, ta mới chịu thua!' },
    ],
    scenario: 'Một thương hiệu tổ chức mini game: người dùng bấm nút quay thưởng, nhận voucher rồi rời đi. Hãy cải thiện game này để tạo trải nghiệm tương tác có ý nghĩa hơn.',
    questions: [
      { q: 'Phương án nào chỉ tăng động lực bên ngoài (extrinsic) nhưng chưa đủ cơ sở để khẳng định involvement bền vững?', options: ['Cho chọn nhiệm vụ thay vì chỉ quay thưởng', 'Bổ sung thử thách, tiến trình, phản hồi', 'Có lựa chọn chơi hoặc hỗ trợ cùng bạn', 'Chỉ tăng giá trị voucher, giữ nguyên game'], answer: 3, hint: 'Thử nhìn xem phương án nào không thay đổi chính trải nghiệm chơi.' },
      { q: 'Cho người chơi chọn nhiệm vụ thay vì chỉ quay thưởng hỗ trợ nhu cầu nào trong Self-Determination Theory?', options: ['Autonomy', 'Competence', 'Relatedness', 'Uniqueness'], answer: 0, hint: 'Nhu cầu về tự do và kiểm soát lựa chọn.' },
      { q: 'Bổ sung thử thách, cấp độ, tiến trình và phản hồi hỗ trợ nhu cầu nào trong SDT?', options: ['Autonomy', 'Competence', 'Relatedness', 'Power'], answer: 1, hint: 'Nhu cầu cảm thấy hiệu quả và làm chủ kỹ năng.' },
      { q: 'Nhiệm vụ hợp tác hoặc chơi cùng bạn hỗ trợ nhu cầu nào trong SDT?', options: ['Autonomy', 'Competence', 'Relatedness', 'Achievement'], answer: 2, hint: 'Nhu cầu cảm thấy kết nối với người khác.' },
    ],
    hitLines: ['Grừ! Kiến thức của ngươi thật đáng gờm!', 'Ối! Ta bị choáng rồi!', 'Không thể nào... Ta sắp thua rồi!', 'Aaa! Ta chịu thua!'],
    missLines: ['Ha ha! Sai rồi! Nhận lấy Journal của ta!'],
    defeat: ['Ta thua rồi... Hóa ra bí mật không nằm ở vòng quay may mắn.', 'Mà là hiểu điều gì thúc đẩy người chơi.', 'Hãy đưa Hoàng tử về đi, chiến binh!'],
  },

  // ---------- Victory ----------
  victory: {
    heading: 'YOU WIN!', sub: 'BẠN ĐÃ GIẢI CỨU HOÀNG TỬ CAMPUCHIA',
    prince: ['Cảm ơn chiến binh dũng cảm!', 'Hoàng gia Campuchia sẽ ghi nhớ công lao này mãi mãi!'],
    message: 'THE SECRET IS NOT JUST THE GAME.\nIT\'S UNDERSTANDING WHAT MOTIVATES THE PLAYER.', // [ĐỀ XUẤT] theo FINAL REVEAL trong file Game On
    reward: '[ PHẦN THƯỞNG BÍ MẬT – nhóm điền tại content.js → victory.reward ]', // [PLACEHOLDER]
  },
};
