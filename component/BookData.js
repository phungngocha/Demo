// BookData.js
const books = [
    {
      id: '1',
      code: 'MS001',
      title: 'Ngân hàng đột phá',
      author: 'Brett King',
      year: 2023,
      price: 100000 ,
      category: 'Kinh tế',
      description: 'Cuốn sách "Ngân Hàng Đột Phá" của tác giả Brett King là một cuốn sách hay và đáng đọc đối với những ai quan tâm đến ngành ngân hàng và các công nghệ mới đang tác động đến ngành này. Cuốn sách cung cấp cái nhìn tổng quan về những xu hướng đột phá đang thay đổi ngành ngân hàng',
      image: require('../screens/img/ngan-hang-dot-pha.jpg'),
    },
    {
      id: '2',
      code: 'MS002',
      title: 'Sống tối giản',
      author: 'Erica Layne',
      year: 2023,
      price: 10,
      category: 'Tâm lí ',
      description: ' sách "Sống tối giản" của tác giả Erica Layne là hướng dẫn toàn diện về cách sống tối giản. Tác giả chia sẻ câu chuyện của bản thân về hành trình từ một người sống trong sự bận rộn, lộn xộn đến một người sống một cuộc sống đơn giản, tập trung vào những điều quan trọng.',
      image: require('../screens/img/song-toi-gian.jpg'),
    },
    {
      id: '3',
      code: 'MS003',
      title: 'Sống như loài người',
      author: 'Alison Davies',
      year: 2023,
      price: 100000,
      category: 'Tâm Lý - Kỹ Năng Sống',
      description: 'Sách "Sống như loài mèo" của tác giả Alison  là một cuốn sách phi hư cấu kể về hành trình của tác giả học hỏi những bài học từ hai chú mèo của mình, Minnie và Honey. Tác giả đã nhận nuôi Minnie và Honey từ một trạm cứu hộ. Cô nhận ra rằng mình yêu mến hai chú mèo này rất nhiều và thậm chí còn học hỏi được nhiều điều từ chúng.Một ngày nọ, Minnie bị một chú chó khác tấn công và bị thương nặng. Với sự chăm sóc tận tình của tác giả, Minnie đã dần hồi phục và trở lại cuộc sống bình thường.',
      image: require('../screens/img/song-nhu-loai-meo.jpg'),
    },
    {
      id: '4',
      title: 'Làm điều quan trọng',
      code: 'MS003',
      author: 'John Doerr',
      year: 2023,
      price: 100000,
      category: ' Kỹ Năng sống',
      description: 'Cuốn sách "Làm Điều Quan Trọng" của tác giả John Doerr giới thiệu phương pháp quản trị OKRs (Objectives and Key Results), một công cụ được sử dụng bởi nhiều công ty công nghệ hàng đầu thế giới như Google, Intel, Adobe,... OKRs giúp doanh nghiệp tập trung vào những mục tiêu quan trọng nhất, đồng thời khuyến khích sự sáng tạo và tự chủ của nhân viên.',
      image: require('../screens/img/lam-dieu-quan-trong.jpg'),
    },
    
    {
      id: '5',
      title: 'Lạc giữa nhân gian',
      code: 'MS005',
      author: 'Đặng Nguyễn Đông Vy',
      year: 2023,
      price: 100000,
      category: 'Hồi Ký - Tuỳ Bút',
      description: 'Lạc giữa nhân gian là một cuốn sách tản văn của tác giả Đặng Nguyễn Đông Vy, được phát hành năm 2023. Lạc giữa nhân gian là những suy tư dịu dàng mà sâu sắc của tác giả về cuộc sống, về tình yêu, về hạnh phúc. Tác giả viết về những điều bình dị trong cuộc sống, những khoảnh khắc nhỏ bé nhưng đáng nhớ, những suy ngẫm về bản thân và thế giới xung quanh.',
      image: require('../screens/img/lac-giua-nhan-gian.jpg'),
    },
    {
      id: '6',
      title: 'Người tù thế kỷ',
      code: 'MS006',
      author: 'Nelson Mandela',
      year: 2023,
      price: 100000,
      category: 'Hồi Ký - Tuỳ Bút',
      description: 'Cuốn hồi ký "Người tù thế kỷ" của Nelson Mandela kể về cuộc đời của ông, từ thời thơ ấu ở một ngôi làng nhỏ ở Nam Phi đến khi trở thành tổng thống của đất nước này.Mandela sinh ra trong một gia đình Xhosa thuộc tầng lớp trung lưu. Ông theo học đại học ở Đại học Fort Hare và Đại học Witwatersrand, nơi ông bắt đầu tham gia các hoạt động chính trị chống lại chế độ phân biệt chủng tộc Apartheid.Mandela bị bắt giam vào năm 1962 và bị kết án tù chung thân. Ông bị giam giữ trong 27 năm trên đảo Robben Island, nơi ông phải chịu đựng những điều kiện sống khắc nghiệt. Trong thời gian bị giam cầm, Mandela tiếp tục hoạt động chính trị và trở thành một biểu tượng của phong trào đấu tranh chống Apartheid. Ông được trả tự do vào năm 1990 và lãnh đạo ANC giành chiến thắng trong cuộc bầu cử đa chủng tộc đầu tiên ở Nam Phi vào năm 1994.Mandela trở thành tổng thống đầu tiên của Nam Phi không phải là người da trắng. Ông phục vụ trong hai nhiệm kỳ và tập trung vào việc hàn gắn đất nước sau nhiều thập kỷ chia rẽ.',
      image: require('../screens/img/nguoi-tu-the-ky.jpg'),
    },
  ];
  
  export default books;
