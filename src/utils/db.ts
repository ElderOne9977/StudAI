export interface Lesson {
  id: string;
  title: string;
  chapterId: string;
  subject: 'chemistry' | 'physics' | 'biology';
  summary: string;
  formula?: string;
  formulaLatex?: string;
  flashcards?: { question: string; answer: string }[];
  calculator?: {
    type: 'density' | 'pressure' | 'concentration' | 'lever';
    inputs: { name: string; label: string; unit: string; placeholder: string }[];
  };
  simulationId?: 'density-sim' | 'pressure-sim' | 'lever-sim' | 'equilibrium-sim' | 'digestion-sim' | 'particles-sim' | 'liquid-pressure-sim' | 'moment-sim' | 'electrification-sim';
  contentMarkdown: string;
}

export interface Chapter {
  id: string;
  title: string;
  subject: 'chemistry' | 'physics' | 'biology';
  lessons: string[]; // lessonIds
}

export const chapters: Record<string, Chapter> = {
  'phad-ung-hoa-hoc': {
    id: 'phad-ung-hoa-hoc',
    title: 'Phản Ứng Hóa Học',
    subject: 'chemistry',
    lessons: ['bien-doi-vat-ly-hoa-hoc', 'phan-ung-hoa-hoc', 'dinh-luat-bao-toan-khoi-luong']
  },
  'mol-va-tinh-toan': {
    id: 'mol-va-tinh-toan',
    title: 'Mol và Tính Toán Hóa Học',
    subject: 'chemistry',
    lessons: ['mol', 'nong-do-dung-dich', 'toc-do-phan-ung']
  },
  'khoi-luong-rieng-va-ap-suat': {
    id: 'khoi-luong-rieng-va-ap-suat',
    title: 'Khối Lượng Riêng & Áp Suất',
    subject: 'physics',
    lessons: ['khoi-luong-rieng', 'ap-suat', 'ap-suat-chat-long-khi-quyen']
  },
  'may-co-don-gian': {
    id: 'may-co-don-gian',
    title: 'Tác Dụng Làm Quay & Máy Cơ Đơn Giản',
    subject: 'physics',
    lessons: ['tac-dung-lam-quay-moment-luc', 'don-bay']
  },
  'dien-tich-va-dong-dien': {
    id: 'dien-tich-va-dong-dien',
    title: 'Điện Tích & Dòng Điện',
    subject: 'physics',
    lessons: ['nhiem-dien-co-xat']
  },
  'co-the-nguoi': {
    id: 'co-the-nguoi',
    title: 'Cơ Thể Người',
    subject: 'biology',
    lessons: ['khai-quat-co-the-nguoi', 'he-tieu-hoa']
  },
  'sinh-thai': {
    id: 'sinh-thai',
    title: 'Sinh Thái Học',
    subject: 'biology',
    lessons: ['he-sinh-thai']
  }
};

export const lessons: Record<string, Lesson> = {
  'bien-doi-vat-ly-hoa-hoc': {
    id: 'bien-doi-vat-ly-hoa-hoc',
    title: 'Biến Đổi Vật Lý & Biến Đổi Hóa Học',
    chapterId: 'phad-ung-hoa-hoc',
    subject: 'chemistry',
    summary: 'Phân biệt hiện tượng chất biến đổi trạng thái (vật lý) và chất biến đổi thành chất khác (hóa học).',
    flashcards: [
      { question: 'Biến đổi vật lý là gì?', answer: 'Là hiện tượng chất biến đổi về trạng thái, hình dạng nhưng vẫn giữ nguyên là chất ban đầu (ví dụ: nước đá tan).' },
      { question: 'Biến đổi hóa học là gì?', answer: 'Là hiện tượng chất biến đổi có sự tạo thành chất mới (ví dụ: sắt bị gỉ, đường cháy).' }
    ],
    contentMarkdown: `
### 1. Hiện tượng Vật lý
Hiện tượng vật lý là hiện tượng chất có sự biến đổi về trạng thái, kích thước hoặc hình dạng, nhưng **không có sự tạo thành chất mới**.
* **Ví dụ:** Nước đá nóng chảy thành nước lỏng, cồn bay hơi, bẻ đôi viên phấn.
* **Đặc trưng:** Liên kết hóa học trong phân tử không bị bẻ gãy, chỉ có khoảng cách và sự sắp xếp giữa các phân tử thay đổi.

### 2. Hiện tượng Hóa học
Hiện tượng hóa học là hiện tượng chất biến đổi có **sự tạo thành chất mới** (chất này biến đổi thành chất khác).
* **Ví dụ:** Đốt giấy thành tro, sữa bị chua, đinh sắt bị gỉ sét trong không khí ẩm.
* **Đặc trưng:** Có sự phá vỡ liên kết trong chất phản ứng và hình thành liên kết mới tạo ra chất sản phẩm.

### 3. Thí nghiệm thực tế (Đốt nến)
Khi đốt một cây nến (làm bằng parafin):
1. **Giai đoạn 1:** Lửa đốt nóng làm parafin nóng chảy ra và chuyển từ thể rắn sang thể lỏng, sau đó bay hơi. Đây là **biến đổi vật lý** vì chỉ thay đổi trạng thái của parafin.
2. **Giai đoạn 2:** Hơi parafin cháy trong không khí tạo thành khí carbon dioxide ($CO_2$) và hơi nước ($H_2O$). Đây là **biến đổi hóa học** vì đã tạo thành chất mới.

> [!NOTE]
> Để nhận biết biến đổi hóa học, ta thường dựa vào các dấu hiệu: thay đổi màu sắc, tỏa nhiệt hoặc phát sáng, sinh ra chất khí (sủi bọt), hoặc tạo chất kết tủa không tan.
`
  },
  'phan-ung-hoa-hoc': {
    id: 'phan-ung-hoa-hoc',
    title: 'Phản Ứng Hóa Học',
    chapterId: 'phan-ung-hoa-hoc',
    subject: 'chemistry',
    summary: 'Tìm hiểu về biến đổi vật lí, biến đổi hóa học, bản chất của phản ứng và các dấu hiệu nhận biết phản ứng xảy ra.',
    flashcards: [
      { question: 'Biến đổi vật lí là gì?', answer: 'Là quá trình chất biến đổi về trạng thái, hình dạng hoặc kích thước nhưng không tạo thành chất mới.' },
      { question: 'Biến đổi hóa học là gì?', answer: 'Là quá trình chất biến đổi có sự tạo thành chất mới.' },
      { question: 'Phản ứng hóa học là gì?', answer: 'Là quá trình biến đổi từ chất này (chất phản ứng) thành chất khác (chất sản phẩm).' },
      { question: 'Dấu hiệu nào nhận biết phản ứng hóa học xảy ra?', answer: 'Thay đổi màu sắc, sủi bọt khí, xuất hiện chất kết tủa, hoặc tỏa nhiệt, phát sáng.' },
      { question: 'Phản ứng tỏa nhiệt và phản ứng thu nhiệt khác nhau thế nào?', answer: 'Phản ứng tỏa nhiệt giải phóng năng lượng dạng nhiệt ra môi trường. Phản ứng thu nhiệt hấp thụ năng lượng dạng nhiệt từ môi trường.' }
    ],
    contentMarkdown: `
### 1. Biến đổi vật lí và biến đổi hóa học
* **Biến đổi vật lí:** Là quá trình chất biến đổi về trạng thái (nóng chảy, đông đặc, bay hơi, ngưng tụ), hình dạng hoặc kích thước nhưng **không tạo thành chất mới**.
  * *Ví dụ:* Nước đá nóng chảy thành nước lỏng; hòa tan muối ăn vào nước thu được nước muối.
* **Biến đổi hóa học:** Là quá trình chất biến đổi có sự **tạo thành chất mới**.
  * *Ví dụ:* Đốt cháy củi tạo thành tro và khí carbon dioxide; đinh sắt để ngoài không khí ẩm bị gỉ sét.

### 2. Phản ứng hóa học
* **Khái niệm:** Phản ứng hóa học là quá trình biến đổi từ chất này thành chất khác.
  * **Chất phản ứng (chất tham gia):** Là các chất ban đầu bị biến đổi.
  * **Chất sản phẩm:** Là các chất mới được sinh ra sau phản ứng.
* **Biểu diễn phản ứng bằng phương trình chữ:**
  $$\\text{Tên các chất phản ứng} \\longrightarrow \\text{Tên các chất sản phẩm}$$
  * *Ví dụ:* 
    $$\\text{Iron (Sắt)} + \\text{Sulfur (Lưu huỳnh)} \\overset{t^\\circ}{\\longrightarrow} \\text{Iron(II) sulfide}$$

### 3. Diễn biến của phản ứng hóa học
Trong phản ứng hóa học, chỉ có liên kết giữa các nguyên tử thay đổi làm cho phân tử này biến đổi thành phân tử khác (chất này biến đổi thành chất khác). Số nguyên tử của mỗi nguyên tố trước và sau phản ứng **luôn giữ nguyên**.

### 4. Dấu hiệu nhận biết có phản ứng hóa học xảy ra
Để biết phản ứng hóa học đã xảy ra, ta có thể quan sát các hiện tượng đi kèm:
1. **Thay đổi màu sắc** của chất.
2. **Xuất hiện chất khí** (sủi bọt khí).
3. **Xuất hiện kết tủa** (chất rắn không tan lắng xuống).
4. **Tỏa nhiệt hoặc phát sáng**.

### 5. Năng lượng trong phản ứng hóa học
* **Phản ứng tỏa nhiệt:** Là phản ứng giải phóng năng lượng dưới dạng nhiệt ra môi trường xung quanh.
  * *Ví dụ:* Phản ứng đốt cháy than, củi, xăng, dầu, khí gas...
* **Phản ứng thu nhiệt:** Là phản ứng hấp thụ năng lượng dưới dạng nhiệt từ môi trường xung quanh để xảy ra.
  * *Ví dụ:* Phản ứng nung đá vôi ($CaCO_3 \\overset{t^\\circ}{\\longrightarrow} CaO + CO_2$).
* **Ứng dụng:** Các phản ứng tỏa nhiệt được dùng làm nguồn cung cấp năng lượng cho đun nấu, sưởi ấm, vận hành động cơ, nhà máy nhiệt điện...
`
  },
  'dinh-luat-bao-toan-khoi-luong': {
    id: 'dinh-luat-bao-toan-khoi-luong',
    title: 'Định Luật Bảo Toàn Khối Lượng',
    chapterId: 'phad-ung-hoa-hoc',
    subject: 'chemistry',
    summary: 'Phát biểu định luật bảo toàn khối lượng và áp dụng để tính khối lượng các chất trong phản ứng.',
    formula: 'm_A + m_B = m_C + m_D',
    formulaLatex: 'm_A + m_B = m_C + m_D',
    flashcards: [
      { question: 'Ai là người đồng phát minh ra định luật bảo toàn khối lượng?', answer: 'Lomonosov (Nga) và Lavoisier (Pháp).' },
      { question: 'Nội dung định luật bảo toàn khối lượng?', answer: 'Trong một phản ứng hóa học, tổng khối lượng của các chất sản phẩm bằng tổng khối lượng của các chất tham gia phản ứng.' },
      { question: 'Tại sao xỉ than sau khi đốt lại nhẹ hơn than tổ ong ban đầu?', answer: 'Vì thành phần carbon trong than đã kết hợp với oxygen trong không khí tạo thành khí carbon dioxide (CO2) bay đi mất.' }
    ],
    contentMarkdown: `
### 1. Nội dung định luật
Được phát biểu độc lập bởi hai nhà bác học Lomonosov (Lô-mô-nô-xốp, người Nga) và Lavoisier (La-voa-đi-ê, người Pháp):
> [!IMPORTANT]
> **Định luật:** Trong một phản ứng hóa học, tổng khối lượng của các chất sản phẩm bằng tổng khối lượng của các chất tham gia phản ứng.

### 2. Thí nghiệm kiểm chứng
Đặt hai cốc lên bàn cân điện tử: cốc (1) đựng dung dịch $Barium\\ chloride$ ($BaCl_2$) và cốc (2) đựng dung dịch $Sodium\\ sulfate$ ($Na_2SO_4$). Cân ghi tổng khối lượng $m_1$.
Đổ cốc (1) vào cốc (2), xuất hiện kết tủa trắng tinh của $Barium\\ sulfate$ ($BaSO_4$). Phản ứng xảy ra:
$$\\text{Barium chloride} + \\text{Sodium sulfate} \\longrightarrow \\text{Barium sulfate} + \\text{Sodium chloride}$$
Sau phản ứng, đặt cốc trở lại cân. Cân vẫn chỉ đúng giá trị $m_1$. Khối lượng được bảo toàn!

### 3. Giải thích khoa học
Trong các phản ứng hóa học, chỉ có liên kết giữa các nguyên tử thay đổi làm cho phân tử này biến đổi thành phân tử khác. Số lượng nguyên tử của mỗi nguyên tố trước và sau phản ứng giữ nguyên không đổi. Vì khối lượng nguyên tử không thay đổi nên tổng khối lượng của các chất cũng giữ nguyên.

### 4. Áp dụng công thức tính toán
Với phản ứng tổng quát: $A + B \\longrightarrow C + D$
Ta có: $m_A + m_B = m_C + m_D$
* **Ví dụ:** Cho $20,8\\text{ g Barium chloride}$ phản ứng với $14,2\\text{ g Sodium sulfate}$ tạo ra $23,3\\text{ g Barium sulfate}$ kết tủa. Khối lượng $Sodium\\ chloride$ tạo thành là:
$$m_{\\text{Sodium chloride}} = 20,8 + 14,2 - 23,3 = 11,7\\text{ g}$$

### 5. Câu hỏi vận dụng thực tế
1. **Đốt than tổ ong**: Xỉ than thu được nhẹ hơn than tổ ong ban đầu vì nguyên tố carbon ($C$) trong than đã phản ứng với khí oxygen ($O_2$) tạo thành khí carbon dioxide ($CO_2$) thoát vào khí quyển.
2. **Lọ vôi sống không đậy nắp**: Lọ đựng vôi sống ($CaO$) để ngoài không khí lâu ngày sẽ nặng hơn ban đầu vì vôi sống đã hấp thụ khí $CO_2$ tạo thành $CaCO_3$ và hấp thụ hơi nước tạo thành $Ca(OH)_2$.
`
  },
  'mol': {
    id: 'mol',
    title: 'Khái niệm về Mol & Khối lượng Mol',
    chapterId: 'mol-va-tinh-toan',
    subject: 'chemistry',
    summary: 'Định nghĩa đơn vị Mol, hằng số Avogadro, tỉ khối của chất khí và các công thức tính toán lượng chất.',
    formula: 'n = \\frac{m}{M} \\quad \\text{và} \\quad d_{A/B} = \\frac{M_A}{M_B}',
    formulaLatex: 'n = \\frac{m}{M} \\quad \\text{và} \\quad d_{A/B} = \\frac{M_A}{M_B}',
    flashcards: [
      { question: 'Mol là gì?', answer: 'Là lượng chất chứa 6,022 x 10^23 hạt vi mô (nguyên tử hoặc phân tử) của chất đó.' },
      { question: 'Thể tích của 1 mol khí ở điều kiện chuẩn (25°C, 1 bar) là bao nhiêu?', answer: 'Là 24,79 lít.' },
      { question: 'Tỉ khối của khí A đối với khí B được tính như thế nào?', answer: 'd_A/B = M_A / M_B. Cho biết khí A nặng hay nhẹ hơn khí B bao nhiêu lần.' },
      { question: 'Khối lượng mol trung bình của không khí là bao nhiêu?', answer: 'Xấp xỉ bằng 29 g/mol.' },
      { question: 'Để thu khí CO2 (M=44) trong phòng thí nghiệm, ta đặt bình như thế nào?', answer: 'Đặt ngửa bình vì d_CO2/kk = 44/29 ≈ 1,52 (CO2 nặng hơn không khí).' }
    ],
    contentMarkdown: `
### 1. Khái niệm về Mol
* **Mol** là lượng chất có chứa $6,022 \\times 10^{23}$ nguyên tử hoặc phân tử của chất đó.
* Con số $N_A = 6,022 \\times 10^{23}$ được gọi là **số Avogadro** (hằng số Avogadro).
  * *Ví dụ:* 1 mol nguyên tử đồng (Cu) chứa $N_A$ nguyên tử Cu; 1 mol phân tử nước ($H_2O$) chứa $N_A$ phân tử $H_2O$.

### 2. Khối lượng Mol ($M$)
* **Khối lượng mol ($M$)** của một chất là khối lượng tính bằng gam của $N_A$ nguyên tử hoặc phân tử chất đó.
* Đơn vị đo khối lượng mol: gam/mol (kí hiệu: g/mol).
* **Đặc điểm:** Khối lượng mol có cùng trị số với khối lượng nguyên tử hoặc phân tử của chất đó tính theo đơn vị amu.
  * *Ví dụ:* Nguyên tử khối của Oxygen là $16\\text{ amu}$ $\\Rightarrow$ Khối lượng mol nguyên tử của Oxygen là $16\\text{ g/mol}$.
  * Phân tử khối của khí carbon dioxide ($CO_2$) là $44\\text{ amu}$ $\\Rightarrow$ Khối lượng mol phân tử của $CO_2$ là $44\\text{ g/mol}$.
* **Công thức chuyển đổi giữa khối lượng và số mol:**
  $$n = \\frac{m}{M} \\quad \\Longrightarrow \\quad m = n \\times M, \\quad M = \\frac{m}{n}$$
  * Trong đó:
    * $n$: Số mol chất (mol)
    * $m$: Khối lượng chất (g)
    * $M$: Khối lượng mol (g/mol)

### 3. Thể tích mol của chất khí ở điều kiện chuẩn
* **Thể tích mol** của chất khí là thể tích chiếm bởi $N_A$ phân tử của chất khí đó.
* Ở **điều kiện chuẩn** (nhiệt độ $25^\\circ\\text{C}$ và áp suất $1\\text{ bar}$), 1 mol của bất kì chất khí nào cũng đều chiếm thể tích là **$24,79\\text{ lít}$**.
* **Công thức tính thể tích khí ở điều kiện chuẩn:**
  $$V = n \\times 24,79 \\quad \\Longrightarrow \\quad n = \\frac{V}{24,79}$$
  * Trong đó:
    * $V$: Thể tích khí ở đkc (lít)
    * $n$: Số mol khí (mol)

### 4. Tỉ khối của chất khí
Tỉ khối cho biết một chất khí A nặng hay nhẹ hơn một chất khí B (hoặc không khí) bao nhiêu lần.

#### a) Tỉ khối của khí A đối với khí B ($d_{A/B}$)
$$d_{A/B} = \\frac{M_A}{M_B}$$
* Nếu $d_{A/B} > 1$: Khí A nặng hơn khí B.
* Nếu $d_{A/B} < 1$: Khí A nhẹ hơn khí B.

#### b) Tỉ khối của khí A đối với không khí ($d_{A/kk}$)
Coi khối lượng mol trung bình của không khí là **$29\\text{ g/mol}$**:
$$d_{A/kk} = \\frac{M_A}{29}$$
* *Ví dụ:* Khí oxygen ($O_2$) có $M_{O_2} = 32\\text{ g/mol}$. Tỉ khối đối với không khí là $d_{O_2/kk} = 32 / 29 \\approx 1,1$. Khí $O_2$ nặng hơn không khí khoảng 1,1 lần.
* *Ứng dụng thực tế:* Để thu các khí nhẹ hơn không khí (như $H_2$), ta úp ngược bình thu. Để thu các khí nặng hơn không khí (như $O_2, CO_2$), ta ngửa bình thu.
`
  },
  'nong-do-dung-dich': {
    id: 'nong-do-dung-dich',
    title: 'Nồng Độ Dung Dịch (C% và CM)',
    chapterId: 'mol-va-tinh-toan',
    subject: 'chemistry',
    summary: 'Tìm hiểu về dung dịch bão hòa, công thức độ tan S và cách tính nồng độ phần trăm C%, nồng độ mol CM.',
    formula: 'C\\% = \\frac{m_{ct}}{m_{dd}} \\times 100\\%',
    formulaLatex: 'C\\% = \\frac{m_{ct}}{m_{dd}} \\times 100\\%',
    calculator: {
      type: 'concentration',
      inputs: [
        { name: 'mct', label: 'Khối lượng chất tan (m_ct)', unit: 'g', placeholder: 'Nhập khối lượng chất tan...' },
        { name: 'mdd', label: 'Khối lượng dung dịch (m_dd)', unit: 'g', placeholder: 'Nhập khối lượng dung dịch...' },
        { name: 'cPercent', label: 'Nồng độ phần trăm (C%)', unit: '%', placeholder: 'Để trống nếu muốn tính...' }
      ]
    },
    flashcards: [
      { question: 'Dung dịch bão hòa là gì?', answer: 'Là dung dịch không thể hòa tan thêm chất tan đó ở một nhiệt độ và áp suất xác định.' },
      { question: 'Độ tan S của một chất là gì?', answer: 'Là số gam chất đó hòa tan trong 100 gam nước để tạo thành dung dịch bão hòa ở nhiệt độ, áp suất xác định.' },
      { question: 'Tại sao khi trời nóng cá lại hay ngoi lên mặt nước?', answer: 'Vì độ tan của chất khí (oxygen) trong nước giảm đi khi nhiệt độ nước tăng lên.' }
    ],
    contentMarkdown: String.raw`
### 1. Dung dịch bão hòa và chưa bão hòa
* **Dung dịch** là hỗn hợp đồng nhất của chất tan và dung môi.
* Ở một nhiệt độ và áp suất xác định:
  * **Dung dịch chưa bão hòa:** là dung dịch có thể hòa tan thêm chất tan.
  * **Dung dịch bão hòa:** là dung dịch không thể hòa tan thêm chất tan được nữa.

### 2. Độ tan của một chất trong nước ($S$)
Độ tan ($S$) của một chất trong nước là số gam chất đó hòa tan trong 100 gam nước để tạo thành dung dịch bão hòa ở nhiệt độ và áp suất xác định.
> [!IMPORTANT]
> **Công thức tính độ tan:**
> $S = \frac{m_{ct}}{m_{\text{nước}}} \times 100$
> * Trong đó:
>   * $S$: Độ tan (g/100 g nước)
>   * $m_{ct}$: Khối lượng chất tan (g)
>   * $m_{\text{nước}}$: Khối lượng nước dùng làm dung môi (g)

* **Ảnh hưởng của nhiệt độ:**
  * Độ tan của hầu hết **chất rắn** tăng khi nhiệt độ tăng.
  * Độ tan của hầu hết **chất khí** giảm khi nhiệt độ tăng hoặc áp suất giảm.
  * *Ứng dụng thực tế:* Ngày nắng nóng, cá thường ngoi lên mặt nước để hô hấp vì nồng độ khí oxygen hòa tan giảm do độ tan của nó giảm khi nhiệt độ nước tăng.

### 3. Nồng độ phần trăm ($C\%$)
Nồng độ phần trăm cho biết số gam chất tan có trong 100 gam dung dịch.
$$C\% = \frac{m_{ct}}{m_{dd}} \times 100\%$$
* Trong đó:
  * $m_{ct}$: Khối lượng chất tan (g)
  * $m_{dd}$: Khối lượng dung dịch (g) ($m_{dd} = m_{ct} + m_{\text{dung môi}}$)

Từ đó ta suy ra: $m_{ct} = \frac{m_{dd} \times C\%}{100}$ và $m_{dd} = \frac{m_{ct} \times 100}{C\%}$

### 4. Nồng độ mol ($C_M$)
Nồng độ mol cho biết số mol chất tan có trong 1 lít dung dịch.
$$C_M = \frac{n}{V} \quad (\text{mol/L}\ \text{hoặc}\ \text{M})$$
* Trong đó:
  * $n$: Số mol chất tan (mol)
  * $V$: Thể tích dung dịch (lít - L)
`
  },
  'toc-do-phan-ung': {
    id: 'toc-do-phan-ung',
    title: 'Tốc Độ Phản Ứng và Chất Xúc Tác',
    chapterId: 'mol-va-tinh-toan',
    subject: 'chemistry',
    summary: 'Các yếu tố ảnh hưởng đến tốc độ phản ứng như nhiệt độ, nồng độ, diện tích tiếp xúc, áp suất và chất xúc tác, cùng ứng dụng thực tiễn.',
    simulationId: 'particles-sim',
    flashcards: [
      { question: 'Tốc độ phản ứng là gì?', answer: 'Là đại lượng đặc trưng cho mức độ nhanh hay chậm của một phản ứng hoá học.' },
      { question: 'Làm thế nào để nhận biết tốc độ phản ứng trong thực nghiệm?', answer: 'Đo thể tích khí sinh ra, khối lượng kết tủa thu được, hoặc quan sát tốc độ sủi bọt, đục màu dung dịch.' },
      { question: 'Có bao nhiêu yếu tố chính ảnh hưởng đến tốc độ phản ứng?', answer: 'Có 5 yếu tố chính: nồng độ, nhiệt độ, diện tích tiếp xúc, áp suất (chất khí) và chất xúc tác.' },
      { question: 'Chất xúc tác là gì?', answer: 'Là chất làm tăng tốc độ phản ứng hóa học nhưng không bị thay đổi về khối lượng và tính chất hóa học sau phản ứng.' },
      { question: 'Tại sao phải để thực phẩm trong tủ lạnh?', answer: 'Nhiệt độ thấp trong tủ lạnh làm chậm tốc độ phản ứng phân hủy thức ăn của vi sinh vật.' }
    ],
    contentMarkdown: `
### 1. Khái niệm tốc độ phản ứng
* **Tốc độ phản ứng** là đại lượng đặc trưng cho mức độ nhanh hay chậm của một phản ứng hoá học.
* *Ví dụ:* 
  * Phản ứng cháy của xăng, cồn sáp diễn ra tức thì, rất nhanh (tốc độ phản ứng rất lớn).
  * Phản ứng gỉ của khung xe sắt ngoài không khí ẩm diễn ra từ từ, mất nhiều tháng (tốc độ phản ứng rất nhỏ).
* **Đo và nhận biết:** Trong thực nghiệm, ta có thể so sánh tốc độ phản ứng bằng cách đo thể tích khí sinh ra, khối lượng kết tủa thu được, hoặc quan sát tốc độ sủi bọt khí, tốc độ xuất hiện kết tủa đục trong một đơn vị thời gian.

### 2. Các yếu tố ảnh hưởng đến tốc độ phản ứng
Tốc độ phản ứng hóa học chịu ảnh hưởng của 5 yếu tố chính:

1. **Nồng độ:** Khi tăng nồng độ chất phản ứng, các hạt ở gần nhau hơn, tần số va chạm hiệu quả tăng lên $\\Rightarrow$ tốc độ phản ứng tăng.
2. **Nhiệt độ:** Khi tăng nhiệt độ, các hạt chuyển động nhanh hơn, năng lượng va chạm lớn hơn và tần số va chạm hiệu quả tăng $\\Rightarrow$ tốc độ phản ứng tăng.
3. **Diện tích bề mặt tiếp xúc:** Đối với chất phản ứng dạng rắn, khi nghiền nhỏ, đập vụn sẽ tăng diện tích tiếp xúc giữa các chất $\\Rightarrow$ tốc độ phản ứng tăng.
4. **Áp suất:** (Đối với chất phản ứng dạng khí) Khi tăng áp suất, khoảng cách giữa các hạt khí thu hẹp lại, làm tăng nồng độ hạt khí và tần số va chạm $\\Rightarrow$ tốc độ phản ứng tăng.
5. **Chất xúc tác:** Là chất làm tăng tốc độ phản ứng hóa học nhưng **không bị thay đổi về khối lượng và tính chất hóa học** sau phản ứng.

### 3. Vận dụng thực tiễn trong cuộc sống
Trong sinh hoạt và sản xuất, con người chủ động điều chỉnh các yếu tố trên để điều khiển tốc độ phản ứng theo mong muốn:
* **Làm chậm phản ứng không mong muốn:**
  * Giữ thức ăn trong tủ lạnh (hạ nhiệt độ) để làm chậm quá trình ôi thiu, hỏng thức ăn do vi sinh vật.
  * Hút chân không hoặc đóng gói kín (giảm nồng độ oxy) để thực phẩm bảo quản được lâu hơn.
* **Làm nhanh phản ứng có lợi:**
  * Chẻ nhỏ củi, đập dập than khi nhóm bếp (tăng diện tích tiếp xúc) giúp lửa cháy to và nhanh hơn.
  * Dùng quạt lò để thổi thêm không khí vào bếp lò (tăng nồng độ oxygen) để tăng nhiệt độ cháy.
  * Sử dụng men (chất xúc tác sinh học) để ủ rượu, làm sữa yogurt, muối dưa.

*Hãy thử mô phỏng bên phải để xem trực quan sự chuyển động và va chạm của hạt khi thay đổi nhiệt độ.*
`
  },
  'khoi-luong-rieng': {
    id: 'khoi-luong-rieng',
    title: 'Khối Lượng Riêng (D)',
    chapterId: 'khoi-luong-rieng-va-ap-suat',
    subject: 'physics',
    summary: 'Định nghĩa khối lượng riêng, đơn vị đo và cách tính toán khi biết khối lượng và thể tích của vật.',
    formula: 'D = m / V',
    formulaLatex: 'D = m / V',
    calculator: {
      type: 'density',
      inputs: [
        { name: 'm', label: 'Khối lượng (m)', unit: 'kg', placeholder: 'Nhập khối lượng...' },
        { name: 'v', label: 'Thể tích (V)', unit: 'm3', placeholder: 'Nhập thể tích...' },
        { name: 'd', label: 'Khối lượng riêng (D)', unit: 'kg/m3', placeholder: 'Để trống nếu muốn tính...' }
      ]
    },
    simulationId: 'density-sim',
    flashcards: [
      { question: 'Định nghĩa khối lượng riêng?', answer: 'Là khối lượng của một đơn vị thể tích chất đó.' },
      { question: 'Khối lượng riêng của sắt là bao nhiêu?', answer: '7800 kg/m3 (hoặc 7.8 g/cm3).' },
      { question: 'Khối lượng riêng của nhôm là bao nhiêu?', answer: '2700 kg/m3 (hoặc 2.7 g/cm3).' }
    ],
    contentMarkdown: `
### 1. Câu hỏi khởi động
Trong đời sống, ta thường nói *"sắt nặng hơn nhôm"*. Nói như thế là chưa chính xác về mặt khoa học vật lý. Để so sánh chính xác, ta phải so sánh khối lượng của hai khối sắt và nhôm có **cùng thể tích**. Đại lượng này gọi là **Khối lượng riêng**.

### 2. Định nghĩa Khối lượng riêng
Khối lượng riêng của một chất là khối lượng của một đơn vị thể tích chất đó.
> [!IMPORTANT]
> **Công thức tính khối lượng riêng:**
> *D = m / V*
> * Trong đó:
>   * *D* là khối lượng riêng (đơn vị: kg/m³ hoặc g/cm³ hoặc g/mL)
>   * *m* là khối lượng của vật (kg hoặc g)
>   * *V* là thể tích của vật (m³ hoặc cm³)

Mối liên hệ giữa các đơn vị:
*1 g/cm³ = 1000 kg/m³*
*1 g/cm³ = 1 g/mL*

### 3. Thí nghiệm tìm hiểu
1. **Thí nghiệm 1:** Cân 3 thỏi sắt có thể tích tăng dần *V*, *2V*, *3V*. Ta thấy khối lượng của chúng cũng tăng tương ứng *m*, *2m*, *3m*, nhưng tỉ số *m / V* của chúng luôn **không đổi**.
2. **Thí nghiệm 2:** Cân 3 thỏi sắt, nhôm, đồng có **cùng thể tích** *V*. Khối lượng đo được là khác nhau (*m*(đồng) > *m*(sắt) > *m*(nhôm)). Điều này chứng minh các chất khác nhau có khối lượng riêng khác nhau.

### 4. Khối lượng riêng một số chất thông dụng
* **Đồng (Cu):** 8,96 g/cm³ (8960 kg/m³)
* **Sắt (Fe):** 7,8 g/cm³ (7800 kg/m³)
* **Nhôm (Al):** 2,7 g/cm³ (2700 kg/m³)
* **Nước nguyên chất:** 1 g/cm³ (1000 kg/m³)
* **Gỗ tốt:** khoảng 0,8 g/cm³ (800 kg/m³)
`
  },
  'ap-suat': {
    id: 'ap-suat',
    title: 'Áp Suất (p)',
    chapterId: 'khoi-luong-rieng-va-ap-suat',
    subject: 'physics',
    summary: 'Tìm hiểu về áp lực, áp suất, đơn vị tính Pascal (Pa) và thí nghiệm xác định độ lún của vật trên bề mặt bột mịn.',
    formula: 'p = \\frac{F}{S}',
    formulaLatex: 'p = \\frac{F}{S}',
    calculator: {
      type: 'pressure',
      inputs: [
        { name: 'f', label: 'Áp lực (F)', unit: 'N', placeholder: 'Nhập áp lực...' },
        { name: 's', label: 'Diện tích bị ép (S)', unit: 'm2', placeholder: 'Nhập diện tích...' },
        { name: 'p', label: 'Áp suất (p)', unit: 'N/m2 (Pa)', placeholder: 'Để trống nếu muốn tính...' }
      ]
    },
    simulationId: 'pressure-sim',
    flashcards: [
      { question: 'Áp lực là gì?', answer: 'Là lực ép có phương vuông góc với bề mặt bị ép.' },
      { question: 'Nêu các đơn vị đo áp suất thông dụng?', answer: 'Pascal (Pa), Bar, Atmôtphe (atm), Milimét thủy ngân (mmHg).' },
      { question: 'Tại sao lưỡi dao cần phải mài sắc?', answer: 'Mài sắc làm giảm diện tích bị ép S, giúp tăng áp suất p tác dụng lên vật cần cắt.' }
    ],
    contentMarkdown: `
### 1. Câu hỏi khởi động
Tại sao khi một em bé đứng lên chiếc nệm thì nệm lại bị lún sâu hơn khi người lớn nằm thẳng trên nệm? Để giải thích hiện tượng này, ta cần tìm hiểu về áp lực và diện tích bề mặt tiếp xúc.

### 2. Áp lực là gì?
Áp lực là lực ép có phương vuông góc với bề mặt bị ép.
* **Ví dụ:** Lực của thùng hàng đè xuống sàn nhà, lực của ngón tay ép lên mũ đinh.

### 3. Thí nghiệm về tác dụng của áp lực (Độ lún)
Đặt các khối sắt hình hộp chữ nhật lên khay bột mịn trong 3 trường hợp:
* **Trường hợp a:** Đặt nằm ngang (Áp lực $F$, diện tích ép $S$).
* **Trường hợp b:** Chồng 2 khối sắt nằm ngang (Áp lực $2F$, diện tích ép $S$). Kết quả: **Độ lún tăng lên** ($h_b > h_a$).
* **Trường hợp c:** Đặt thẳng đứng (Áp lực $F$, diện tích ép $S_{nhỏ} < S$). Kết quả: **Độ lún tăng lên** ($h_c > h_a$).

> [!TIP]
> Tác dụng của áp lực (độ lún) phụ thuộc đồng thời vào 2 yếu tố: tỉ lệ thuận với độ lớn của áp lực $F$ và tỉ lệ nghịch với diện tích bị ép $S$.

### 4. Công thức tính Áp suất
Áp suất là trị số của áp lực trên một đơn vị diện tích bị ép.
$$p = \\frac{F}{S}$$
* Trong đó:
  * $p$: Áp suất (đơn vị: Pascal, kí hiệu $\\text{Pa}$)
  * $F$: Áp lực tác dụng (đơn vị: Niutơn - $\\text{N}$)
  * $S$: Diện tích bị ép (đơn vị: mét vuông - $\\text{m}^2$)

### 5. Các đơn vị đo áp suất khác trong thực tế
* **Pascal (Pa):** $1\\text{ Pa} = 1\\text{ N/m}^2$
* **Bar:** $1\\text{ Bar} = 10^5\\text{ Pa}$
* **Atmôtphe (atm):** $1\\text{ atm} = 1,013 \\times 10^5\\text{ Pa}$ (áp suất khí quyển tiêu chuẩn)
* **Milimét thủy ngân (mmHg):** $1\\text{ mmHg} = 133,3\\text{ Pa}$
`
  },
  'ap-suat-chat-long-khi-quyen': {
    id: 'ap-suat-chat-long-khi-quyen',
    title: 'Áp Suất Chất Lỏng. Áp Suất Khí Quyển',
    chapterId: 'khoi-luong-rieng-va-ap-suat',
    subject: 'physics',
    summary: 'Tìm hiểu áp suất chất lỏng theo mọi phương, nguyên lí Pascan, ứng dụng máy nén thủy lực, sự tồn tại và vai trò của áp suất khí quyển trong đời sống.',
    formula: '\\frac{F_2}{F_1} = \\frac{S_2}{S_1}',
    formulaLatex: '\\frac{F_2}{F_1} = \\frac{S_2}{S_1}',
    simulationId: 'liquid-pressure-sim',
    flashcards: [
      { question: 'Chất lỏng gây ra áp suất lên những vị trí nào của bình chứa và theo những phương nào?', answer: 'Chất lỏng gây ra áp suất theo mọi phương lên đáy bình, thành bình và mọi vật nằm trong lòng nó.' },
      { question: 'Phát biểu nguyên lí truyền áp suất chất lỏng của Pascan.', answer: 'Áp suất tác dụng vào chất lỏng đựng trong bình kín sẽ được chất lỏng truyền đi nguyên vẹn theo mọi hướng.' },
      { question: 'Áp suất chất lỏng thay đổi như thế nào khi ta đưa một vật xuống sâu hơn trong lòng chất lỏng?', answer: 'Càng đưa vật xuống sâu, áp suất chất lỏng tác dụng lên vật càng lớn (tỉ lệ thuận với độ sâu h).' },
      { question: 'Áp suất khí quyển là gì và nó có đặc điểm gì về phương tác dụng?', answer: 'Áp suất khí quyển là áp suất do lớp không khí bao quanh Trái Đất (có trọng lượng) gây ra lên bề mặt Trái Đất và mọi vật trên đó. Áp suất khí quyển tác dụng theo mọi phương.' },
      { question: 'Tại sao khi đi máy bay lúc đang cất cánh hoặc hạ cánh, ta thường có cảm giác tai bị đau hoặc ù tai? Hãy nêu cách khắc phục đơn giản.', answer: 'Do thay đổi độ cao đột ngột khiến áp suất khí quyển bên ngoài tai thay đổi nhanh, gây chênh lệch áp suất giữa tai giữa và môi trường làm màng nhĩ bị đẩy lệch. Cách khắc phục: nuốt nước bọt, ngáp hoặc nhai kẹo cao su giúp thông vòi tai, cân bằng lại áp suất.' },
      { question: 'Một máy nén thủy lực có pít-tông lớn gấp 50 lần pít-tông nhỏ. Nếu tác dụng một lực 150 N lên pít-tông nhỏ thì lực nâng thu được ở pít-tông lớn là bao nhiêu?', answer: 'Áp dụng công thức máy nén thủy lực: F₂ = F₁ × (S₂ / S₁) = 150 × 50 = 7500 N. Lực nâng thu được ở pít-tông lớn là 7500 N.' },
      { question: 'Hãy giải thích tại sao muốn nước trong các bình chứa chảy ra vòi một cách dễ dàng và liên tục thì trên nắp bình luôn phải thiết kế một lỗ nhỏ thông với không khí.', answer: 'Lỗ nhỏ giúp thông khí quyển với bên trong bình. Khi đó áp suất khí quyển bên ngoài ép từ trên mặt nước xuống, đẩy nước chảy ra vòi liên tục và dễ dàng. Nếu nắp kín, khi nước chảy ra bớt, áp suất khí bên trong bình giảm xuống nhỏ hơn áp suất khí quyển bên ngoài, lực ép của khí quyển bên ngoài ở vòi sẽ cản không cho nước tiếp tục chảy ra.' },
      { question: 'Trình bày nguyên lí hoạt động giúp chiếc giác mút cao su có thể dính chặt trên một mặt kính nhẵn phẳng.', answer: 'Khi ấn mạnh giác mút lên kính, hầu hết không khí bên trong bị đẩy ra ngoài khiến áp suất trong giác mút rất nhỏ. Áp suất khí quyển bên ngoài lớn hơn rất nhiều sẽ ép chặt giác mút vào mặt kính. Lực ma sát tĩnh lớn giữ giác mút không bị trượt rơi xuống.' },
      { question: 'Trong các bình xịt nước cầm tay, việc ta liên tục ấn tay bơm có tác dụng gì đối với áp suất không khí bên trong bình?', answer: 'Việc liên tục ấn tay bơm giúp nén thêm không khí vào trong bình, làm tăng lượng khí và do đó làm tăng áp suất không khí bên trong bình. Áp suất khí nén cao sẽ đẩy nước phun mạnh ra ngoài qua vòi phun.' },
      { question: 'Một thợ lặn ở sâu dưới lòng biển chịu tác dụng của những loại áp suất nào? Áp suất nào sẽ thay đổi khi người đó lặn sâu hơn?', answer: 'Người thợ lặn chịu tác dụng của hai loại áp suất: áp suất chất lỏng (nước biển) và áp suất khí quyển (truyền qua nước). Khi lặn sâu hơn, chỉ có áp suất chất lỏng (nước biển) tăng lên do chiều cao cột chất lỏng phía trên tăng, còn áp suất khí quyển tác dụng lên mặt thoáng không đổi.' }
    ],
    contentMarkdown: `
### 1. Kiến thức cốt lõi
* **Tác dụng của áp suất chất lỏng:** Chất lỏng gây ra áp suất theo mọi phương lên đáy bình, thành bình và mọi vật nằm trong lòng nó. Vật càng ở sâu dưới lòng chất lỏng thì chịu tác dụng của áp suất chất lỏng càng lớn.
* **Nguyên lí Pascan:** Áp suất tác dụng vào chất lỏng đựng trong bình kín sẽ được chất lỏng truyền đi nguyên vẹn theo mọi hướng.
* **Ứng dụng máy nén thủy lực:** Dựa trên nguyên lí Pascan, khi tác dụng một lực nhỏ $F_1$ lên pít-tông nhỏ diện tích $S_1$, áp suất truyền sang pít-tông lớn diện tích $S_2$ tạo lực nâng lớn $F_2$:
  $$\\frac{F_2}{F_1} = \\frac{S_2}{S_1} \\implies F_2 = F_1 \\times \\frac{S_2}{S_1}$$
* **Áp suất khí quyển:** Do không khí có trọng lượng nên Trái Đất chịu tác dụng của áp suất khí quyển. Áp suất khí quyển tác dụng theo mọi phương lên bề mặt Trái Đất và mọi vật.
* **Hiện tượng ù tai:** Khi cất/hạ cánh máy bay, đi thang máy cao tốc, áp suất khí quyển thay đổi đột ngột làm mất cân bằng áp suất giữa tai giữa và môi trường, làm màng nhĩ bị phồng ra hoặc lõm vào gây ù tai.

### 2. Các dạng bài tập điển hình
* **Dạng 1: Tính lực và diện tích trong máy nén thủy lực.** Sử dụng tỉ lệ $\\frac{F_2}{F_1} = \\frac{S_2}{S_1}$ để tìm đại lượng chưa biết.
* **Dạng 2: Giải thích hiện tượng áp suất khí quyển.** Phân tích sự chênh lệch áp suất giữa bên trong và bên ngoài vật (giác mút, bình nước có vòi...).
`
  },
  'don-bay': {
    id: 'don-bay',
    title: 'Đòn Bẩy & Máy Cơ Đơn Giản',
    chapterId: 'may-co-don-gian',
    subject: 'physics',
    summary: 'Nguyên lý hoạt động của các loại đòn bẩy lớp 1, 2, 3 và ứng dụng thực tiễn của chúng.',
    formula: 'F₁ · d₁ = F₂ · d₂ ⟹ F₁/F₂ = d₂/d₁',
    formulaLatex: 'F₁ · d₁ = F₂ · d₂ ⟹ F₁/F₂ = d₂/d₁',
    calculator: {
      type: 'lever',
      inputs: [
        { name: 'f1', label: 'Lực cản F1 (Trọng lượng vật)', unit: 'N', placeholder: 'Nhập lực F1...' },
        { name: 'd1', label: 'Khoảng cách d1 (Điểm tựa đến F1)', unit: 'm', placeholder: 'Nhập d1...' },
        { name: 'f2', label: 'Lực tác dụng F2 (Lực kéo)', unit: 'N', placeholder: 'Nhập lực F2...' },
        { name: 'd2', label: 'Khoảng cách d2 (Điểm tựa đến F2)', unit: 'm', placeholder: 'Nhập d2...' }
      ]
    },
    simulationId: 'lever-sim',
    flashcards: [
      { question: 'Cấu tạo của đòn bẩy gồm các điểm nào?', answer: 'Gồm điểm tựa O, điểm tác dụng lực cản O1 và điểm tác dụng lực nâng O2.' },
      { question: 'Đòn bẩy loại 1 là gì?', answer: 'Là đòn bẩy có điểm tựa O nằm giữa điểm đặt của F1 và F2 (ví dụ: bập bênh, cái kéo).' },
      { question: 'Đòn bẩy loại nào luôn cho lợi về lực?', answer: 'Đòn bẩy loại 2, vì cánh tay đòn d2 của lực kéo luôn lớn hơn cánh tay đòn d1 của lực cản.' }
    ],
    contentMarkdown: String.raw`
### 1. Cấu tạo chung của đòn bẩy
Đòn bẩy là một thanh cứng có thể quay quanh một trục cố định gọi là **Điểm tựa (*O*)**. Khi chịu tác dụng của lực làm quay, đòn bẩy có thể thay đổi hướng hoặc độ lớn của lực tác dụng.
Các điểm đặc trưng:
* *O*: Điểm tựa.
* *O₁*: Điểm tác dụng lực cản (*F₁*). Cánh tay đòn tương ứng là *d₁*.
* *O₂*: Điểm tác dụng lực nâng (*F₂*). Cánh tay đòn tương ứng là *d₂*.

### 2. Phân loại Đòn bẩy theo SGK KHTN 8
Tùy theo vị trí tương đối giữa điểm tựa *O* và điểm đặt lực, ta có ba loại đòn bẩy:

#### a) Đòn bẩy loại 1
* **Đặc điểm:** Điểm tựa *O* nằm trong khoảng giữa hai điểm đặt lực *O₁* và *O₂*.
* **Ứng dụng:** Cái kéo, kìm bấm, bập bênh, kìm nhổ đinh.
* **Tác dụng:** Thay đổi hướng của lực tác dụng (ví dụ ấn tay xuống đòn bẩy nâng vật lên).

#### b) Đòn bẩy loại 2
* **Đặc điểm:** Điểm tựa *O* nằm ngoài khoảng giữa hai lực, và lực nâng *F₂* nằm xa điểm tựa hơn lực cản *F₁* (*d₂* > *d₁*).
* **Ứng dụng:** Xe cút kít, cái khui nắp chai nước ngọt.
* **Tác dụng:** **Luôn được lợi về lực** vì *d₂* > *d₁* ==> *F₂* < *F₁*.

#### c) Đòn bẩy loại 3 (Đòn bẩy không cho lợi về lực)
* **Đặc điểm:** Điểm tựa *O* nằm ngoài khoảng giữa hai lực, và lực nâng *F₂* nằm gần điểm tựa hơn lực cản *F₁* (*d₂* < *d₁*).
* **Ứng dụng:** Cái nhíp gắp vi sinh, đũa ăn, cần câu cá.
* **Tác dụng:** Tuy không được lợi về lực (*F₂* > *F₁*), nhưng cho ta **lợi về quãng đường di chuyển và tốc độ**.

### 3. Điều kiện cân bằng đòn bẩy
Đòn bẩy ở trạng thái cân bằng khi momen lực làm quay theo hai chiều triệt tiêu nhau:
> [!IMPORTANT]
> **Hệ thức cân bằng:**
> F₁ · d₁ = F₂ · d₂ ⟹ F₁/F₂ = d₂/d₁
`
  },
  'he-tieu-hoa': {
    id: 'he-tieu-hoa',
    title: 'Hệ Tiêu Hóa ở Người',
    chapterId: 'co-the-nguoi',
    subject: 'biology',
    summary: 'Cấu tạo hệ tiêu hóa, quá trình tiêu hóa cơ học và biến đổi hóa học nhờ enzyme trong cơ thể.',
    simulationId: 'digestion-sim',
    flashcards: [
      { question: 'Chất dinh dưỡng là gì?', answer: 'Là các chất trong thức ăn được cơ thể sử dụng làm nguyên liệu cấu tạo cơ thể và giải phóng năng lượng.' },
      { question: 'Enzyme nào ở khoang miệng giúp tiêu hóa hóa học?', answer: 'Enzyme amylase trong nước bọt giúp biến tinh bột chín thành đường maltose.' },
      { question: 'Tại sao ruột non là nơi hấp thụ chất dinh dưỡng chủ yếu?', answer: 'Vì ruột non có các lông ruột và mạng lưới mao mạch máu, mạch bạch huyết dày đặc tạo diện tích tiếp xúc lớn.' }
    ],
    contentMarkdown: `
### 1. Khái niệm Chất dinh dưỡng và Dinh dưỡng
* **Chất dinh dưỡng:** là các chất có trong thức ăn mà cơ thể sử dụng làm nguyên liệu cấu tạo cơ thể và cung cấp năng lượng cho các hoạt động sống (carbohydrate, protein, chất béo, vitamin, chất khoáng).
* **Dinh dưỡng:** là quá trình thu nhận, biến đổi và sử dụng chất dinh dưỡng để duy trì sự sống của cơ thể.

### 2. Cấu tạo của Hệ tiêu hóa ở người
Hệ tiêu hóa gồm hai phần phối hợp nhịp nhàng:
* **Ống tiêu hóa:** Miệng $\rightarrow$ Hầu $\rightarrow$ Thực quản $\rightarrow$ Dạ dày $\rightarrow$ Ruột non $\rightarrow$ Ruột già $\rightarrow$ Hậu môn.
* **Tuyến tiêu hóa:** Tuyến nước bọt, tuyến tụy, gan (tiết mật), túi mật, và tuyến vị.
* *Lưu ý:* Thức ăn **không đi qua** tuyến nước bọt, gan, và tụy mà các tuyến này chỉ tiết dịch tiêu hóa đổ vào ống tiêu hóa.

### 3. Chi tiết quá trình tiêu hóa trong các cơ quan
Quá trình biến đổi thức ăn diễn ra qua 4 giai đoạn chính tại ống tiêu hóa:

#### a) Tiêu hóa ở khoang miệng
* **Biến đổi vật lý:** Răng nhai nghiền nhỏ thức ăn, lưỡi đảo trộn giúp thấm đều nước bọt.
* **Biến đổi hóa học:** Enzyme **amylase** của tuyến nước bọt phân giải một phần tinh bột chín trong thức ăn thành đường **maltose**.

#### b) Tiêu hóa ở dạ dày
* **Biến đổi vật lý:** Dạ dày co bóp mạnh mẽ để nghiền thức ăn nhuyễn mịn và trộn đều với dịch vị.
* **Biến đổi hóa học:** Dịch vị chứa **hydrochloric acid (HCl)** tạo môi trường acid hoạt hóa enzyme **pepsin** để cắt ngắn các chuỗi protein phức tạp thành chuỗi peptide đơn giản hơn. Ngoài ra còn có enzyme **lipase** hỗ trợ tiêu hóa chất béo.

#### c) Tiêu hóa & Hấp thụ ở ruột non
* **Tiêu hóa hóa học:** Đây là nơi tiêu hóa quan trọng nhất. Thức ăn nhận dịch mật (từ gan), dịch tụy (từ tụy) và dịch ruột chứa đầy đủ các loại enzyme giúp biến đổi hoàn toàn thức ăn thành các chất đơn giản nhất (glucose, amino acid, acid béo).
* **Hấp thụ:** Niêm mạc ruột non có hàng triệu **lông ruột** cực nhỏ và mạng mao mạch máu, mao mạch bạch huyết dày đặc, giúp tăng diện tích bề mặt hấp thụ lên gấp hàng trăm lần để đưa dưỡng chất vào nuôi cơ thể.

#### d) Tiêu hóa ở ruột già và trực tràng
Phần bã thức ăn không hấp thụ được chuyển xuống ruột già. Tại đây diễn ra sự hấp thụ lại nước, cô đặc chất bã và lên men phân hủy chất thải nhờ hệ vi sinh vật đường ruột trước khi thải ra ngoài qua hậu môn.
`
  },
  'he-sinh-thai': {
    id: 'he-sinh-thai',
    title: 'Hệ Sinh Thái',
    chapterId: 'sinh-thai',
    subject: 'biology',
    summary: 'Tìm hiểu thành phần vô sinh và hữu sinh của hệ sinh thái, phân loại các hệ sinh thái tự nhiên/nhân tạo, chuỗi/lưới thức ăn, dòng năng lượng và biện pháp bảo vệ.',
    simulationId: 'equilibrium-sim',
    flashcards: [
      { question: 'Hệ sinh thái gồm những thành phần cấu trúc nào?', answer: 'Thành phần vô sinh (sinh cảnh) và thành phần hữu sinh (sinh vật sản xuất, sinh vật tiêu thụ, sinh vật phân giải).' },
      { question: 'Có những kiểu hệ sinh thái chính nào?', answer: 'Hệ sinh thái tự nhiên (trên cạn, dưới nước) và hệ sinh thái nhân tạo (đồng ruộng, đô thị, rừng trồng...).' },
      { question: 'Chuỗi thức ăn là gì?', answer: 'Là một dãy gồm nhiều loài sinh vật có quan hệ dinh dưỡng với nhau, loài này ăn loài phía trước và bị loài phía sau ăn.' },
      { question: 'Dòng năng lượng chuyển hóa trong hệ sinh thái như thế nào?', answer: 'Năng lượng đi từ mặt trời -> sinh vật sản xuất -> các bậc sinh vật tiêu thụ -> sinh vật phân giải, tiêu hao ~90% qua mỗi bậc.' },
      { question: 'Nêu các biện pháp bảo vệ các hệ sinh thái rừng và biển?', answer: 'Ngăn chặn phá rừng, trồng rừng; cấm đánh bắt bằng điện/chất nổ, kiểm soát ô nhiễm biển.' }
    ],
    contentMarkdown: `
### 1. Khái niệm Hệ sinh thái
* **Định nghĩa:** Hệ sinh thái là một hệ thống bao gồm quần xã sinh vật và môi trường sống của chúng (sinh cảnh).
* Trong hệ sinh thái, các loài sinh vật tương tác trực tiếp hoặc gián tiếp với nhau, đồng thời tác động qua lại với môi trường vô sinh xung quanh tạo thành một hệ thống sinh học hoàn chỉnh và tự điều hòa ổn định.

### 2. Các thành phần cấu trúc của hệ sinh thái
Một hệ sinh thái hoàn chỉnh luôn bao gồm hai thành phần cơ bản:
1. **Thành phần vô sinh (Sinh cảnh):** Gồm các nhân tố không sống như ánh sáng mặt trời, nhiệt độ, nước, không khí, đất đá, chất vô cơ, chất hữu cơ hòa tan...
2. **Thành phần hữu sinh (Quần xã sinh vật):** Gồm tất cả các loài sinh vật sống trong hệ sinh thái, được phân chia thành 3 nhóm chức năng:
   * **Sinh vật sản xuất:** Là những sinh vật có khả năng tự tổng hợp chất hữu cơ từ các chất vô cơ nhờ năng lượng ánh sáng mặt trời (thực vật, tảo, vi khuẩn lam).
   * **Sinh vật tiêu thụ:** Là sinh vật dị dưỡng, ăn thực vật hoặc ăn động vật khác (động vật ăn thực vật, động vật ăn thịt, động vật ăn tạp).
   * **Sinh vật phân giải:** Là sinh vật phân hủy xác chết, chất thải của sinh vật khác thành các chất vô cơ đơn giản trả lại môi trường (vi khuẩn, nấm, giun đất).

### 3. Phân loại các hệ sinh thái
* **Hệ sinh thái tự nhiên:**
  * *Hệ sinh thái trên cạn:* Rừng mưa nhiệt đới, rừng lá kim, hoang mạc, sa mạc, đồng cỏ...
  * *Hệ sinh thái dưới nước:* Gồm hệ sinh thái nước ngọt (sông, suối, ao, hồ) và hệ sinh thái nước mặn (biển, rạn san hô, cửa sông).
* **Hệ sinh thái nhân tạo:** Do con người tạo ra và duy trì phục vụ lợi ích của mình, như đồng ruộng, ao cá, rừng trồng, đô thị...
  * *So sánh:* Hệ sinh thái nhân tạo có tính đa dạng sinh học thấp hơn, chuỗi thức ăn ngắn hơn và khả năng tự phục hồi kém hơn so với hệ sinh thái tự nhiên, cần sự bổ sung năng lượng và chăm sóc thường xuyên từ con người.

### 4. Chuỗi thức ăn và Lưới thức ăn
Sự trao đổi chất và chuyển hóa năng lượng trong quần xã được thực hiện qua chuỗi và lưới thức ăn:
* **Chuỗi thức ăn:** Là một dãy gồm nhiều loài sinh vật có quan hệ dinh dưỡng với nhau. Mỗi loài trong chuỗi thức ăn vừa là sinh vật tiêu thụ mắt xích phía trước, vừa là sinh vật bị mắt xích phía sau tiêu thụ.
  * *Ví dụ:* Cỏ $\rightarrow$ Châu chấu $\rightarrow$ Nhái $\rightarrow$ Rắn $\rightarrow$ Diều hâu.
* **Lưới thức ăn:** Trong tự nhiên, một loài sinh vật thường tham gia vào nhiều chuỗi thức ăn khác nhau. Nhiều chuỗi thức ăn đan xen và có những mắt xích chung tạo thành một lưới thức ăn. Lưới thức ăn càng phức tạp thì hệ sinh thái càng ổn định và bền vững.

### 5. Dòng năng lượng trong hệ sinh thái
Năng lượng ánh sáng mặt trời đi vào hệ sinh thái qua sinh vật sản xuất, truyền qua các bậc dinh dưỡng (từ sinh vật tiêu thụ này sang sinh vật tiêu thụ khác) rồi cuối cùng đi vào sinh vật phân giải. Qua mỗi bậc dinh dưỡng, năng lượng bị tiêu hao rất lớn (khoảng 90%) do tỏa nhiệt và hoạt động hô hấp, chỉ có khoảng 10% năng lượng được tích lũy chuyển cho bậc tiếp theo.

### 6. Bảo vệ các hệ sinh thái
Bảo vệ sự bền vững của các hệ sinh thái là bảo vệ môi trường sống của con người:
* **Hệ sinh thái rừng:** Bảo vệ rừng tự nhiên, phòng chống cháy rừng, tích cực trồng rừng phủ xanh đất trống.
* **Hệ sinh thái biển:** Kiểm soát việc đánh bắt hải sản (không dùng chất nổ, điện), bảo vệ rạn san hô, giảm thiểu ô nhiễm rác thải nhựa đại dương.
* **Hệ sinh thái nông nghiệp:** Sử dụng phân bón hữu cơ hợp lí, hạn chế thuốc bảo vệ thực vật hóa học, bảo vệ đất chống xói mòn và bạc màu.
`
  },
  'tac-dung-lam-quay-moment-luc': {
    id: 'tac-dung-lam-quay-moment-luc',
    title: 'Tác Dụng Làm Quay. Moment Lực',
    chapterId: 'may-co-don-gian',
    subject: 'physics',
    summary: 'Tìm hiểu tác dụng làm quay của lực quanh một trục hoặc một điểm cố định, định nghĩa Moment lực, cánh tay đòn và các ứng dụng thực tế.',
    formula: 'M = F \\cdot d',
    formulaLatex: 'M = F \\cdot d',
    simulationId: 'moment-sim',
    flashcards: [
      { question: 'Đại lượng nào được dùng để đặc trưng cho tác dụng làm quay của lực lên một vật quanh một điểm hoặc một trục cố định?', answer: 'Đó chính là Moment lực (kí hiệu là M).' },
      { question: 'Độ lớn của moment lực phụ thuộc vào những yếu tố cụ thể nào?', answer: 'Phụ thuộc vào hai yếu tố: độ lớn của lực tác dụng (F) và khoảng cách vuông góc từ trục quay đến giá của lực (cánh tay đòn d).' },
      { question: 'Khi giá của lực cắt trục quay hoặc song song với trục quay thì tác dụng làm quay của lực đó thay đổi như thế nào?', answer: 'Tác dụng làm quay bằng 0 (lực không thể làm vật quay quanh trục được).' },
      { question: 'Tại sao khi thiết kế các cánh cửa đóng mở quay, người ta luôn bố trí tay nắm cửa nằm ở mép xa bản lề nhất mà không đặt gần bản lề?', answer: 'Để tăng cánh tay đòn d (khoảng cách từ bản lề - trục quay đến điểm tác dụng lực). Nhờ đó, ta có thể tạo ra moment lực đủ lớn để quay cửa chỉ với lực tác dụng nhỏ.' },
      { question: 'Để xe đạp có thể chuyển động dễ dàng ngay từ trạng thái đứng yên, khi bắt đầu đạp pê-đan, ta nên tác dụng lực theo hướng nào và vào vị trí nào? Giải thích dựa vào kiến thức moment lực.', answer: 'Ta nên tác dụng lực theo phương vuông góc với đùi đĩa (pê-đan) hướng xuống dưới và đạp vào vị trí rìa ngoài cùng của pê-đan (xa trục quay của đùi đĩa nhất) để tối đa hóa cánh tay đòn d và moment lực làm quay bánh răng đùi đĩa.' },
      { question: 'Một người sử dụng cờ lê để mở ốc. Nếu người đó giữ nguyên lực tác dụng nhưng dịch chuyển vị trí cầm tay từ đầu cán cờ lê vào sát đai ốc thì moment lực sẽ thay đổi ra sao?', answer: 'Moment lực sẽ giảm đi, vì khoảng cách từ trục quay (đai ốc) đến giá của lực (cánh tay đòn d) bị thu ngắn lại.' },
      { question: 'Tại sao những người thợ sửa xe ô tô thường nối thêm một đoạn ống sắt dài vào cán của chiếc cờ lê khi cần tháo các đai ốc bị rỉ sét bám chặt?', answer: 'Nối thêm ống sắt dài giúp tăng chiều dài của cán cờ lê, tức là tăng cánh tay đòn d. Khi đó, với cùng một lực tác dụng của tay, moment lực tạo ra sẽ lớn hơn rất nhiều, đủ để thắng lực cản rỉ sét và tháo ốc dễ dàng.' },
      { question: 'Hai lực có cùng độ lớn cùng tác dụng vuông góc vào một thanh quay, lực thứ nhất cách trục quay 10 cm, lực thứ hai cách trục quay 30 cm. Lực nào có moment lực lớn hơn và lớn hơn bao nhiêu lần?', answer: 'Lực thứ hai có moment lực lớn hơn, và lớn hơn 3 lần (vì cánh tay đòn dài gấp 3 lần: 30 / 10 = 3).' },
      { question: 'Hãy tìm trong thực tế đời sống 2 ví dụ về việc con người kéo dài cánh tay đòn để làm tăng moment lực giúp công việc dễ dàng hơn.', answer: 'Ví dụ 1: Sử dụng xà beng dài để bẩy những hòn đá nặng. Ví dụ 2: Dùng kìm cắt kim loại có tay cầm rất dài và lưỡi cắt ngắn.' },
      { question: 'Vì sao khi ta dùng tay đẩy mạnh vào cạnh trên hoặc cạnh dưới của cánh cửa theo hướng song song dọc theo trục chứa các bản lề thì cửa không thể quay mở ra được?', answer: 'Vì lực tác dụng song song với trục quay (trục bản lề), nên giá của lực song song với trục quay, moment lực bằng 0 và không thể làm cửa quay.' }
    ],
    contentMarkdown: `
### 1. Kiến thức cốt lõi
* **Tác dụng làm quay:** Một lực tác dụng lên một vật có trục quay cố định không song song và không cắt trục quay sẽ làm quay vật đó.
* **Moment lực:** Đại lượng đặc trưng cho tác dụng làm quay của lực, được đo bằng tích độ lớn của lực và cánh tay đòn của nó.
  $$M = F \\times d$$
  * Trong đó:
    * $M$: Moment lực (đơn vị: Newton-mét - $\\text{N}\\cdot\\text{m}$)
    * $F$: Lực tác dụng ($\\text{N}$)
    * $d$: Cánh tay đòn (khoảng cách vuông góc từ trục quay đến giá của lực, đơn vị: mét - $\\text{m}$)
* **Cách tăng moment lực:** Để tăng tác dụng làm quay, ta có thể tăng độ lớn của lực $F$ hoặc tăng độ dài cánh tay đòn $d$ (bằng cách cầm ở vị trí xa trục quay hơn hoặc nối dài dụng cụ).

### 2. Các dạng bài tập điển hình
* **Dạng 1: Tính moment lực khi biết lực và cánh tay đòn.** Chú ý đổi đơn vị cánh tay đòn sang mét ($\\text{m}$) trước khi tính.
* **Dạng 2: Giải thích các hiện tượng làm quay trong thực tiễn.** Phân tích cánh tay đòn và điểm đặt lực (tay nắm cửa, xà beng, cờ lê, kìm cưa...).
`
  },
  'nhiem-dien-co-xat': {
    id: 'nhiem-dien-co-xat',
    title: 'Hiện Tượng Nhiễm Điện Do Cọ Xát',
    chapterId: 'dien-tich-va-dong-dien',
    subject: 'physics',
    summary: 'Tìm hiểu về sự nhiễm điện của các vật do cọ xát, hai loại điện tích âm/dương, quy luật tương tác tĩnh điện và cấu tạo nguyên tử liên quan.',
    formula: '\\text{Dương (+)} \\quad \\text{và} \\quad \\text{Âm (-)}',
    formulaLatex: '\\text{Cùng dấu} \\rightarrow \\text{Đẩy nhau} \\quad | \\quad \\text{Khác dấu} \\rightarrow \\text{Hút nhau}',
    simulationId: 'electrification-sim',
    flashcards: [
      { question: 'Vật nhiễm điện có khả năng đặc biệt nào?', answer: 'Có khả năng hút các vật nhỏ, nhẹ hoặc phóng điện tạo tia lửa.' },
      { question: 'Có những loại điện tích nào và tương tác của chúng?', answer: 'Có điện tích dương (+) và âm (-). Cùng loại thì đẩy nhau, khác loại thì hút nhau.' },
      { question: 'Quy ước thanh nhựa sẫm màu cọ xát vào len nhiễm điện gì?', answer: 'Thanh nhựa sẫm màu cọ xát vào len nhiễm điện âm (-).' },
      { question: 'Vật trung hòa về điện trở thành nhiễm điện dương khi nào?', answer: 'Khi vật đó bị mất bớt electron (bứt e dịch chuyển sang vật khác).' },
      { question: 'Nguyên nhân bụi bông hay bám vào cánh quạt điện quay?', answer: 'Do cánh quạt cọ xát mạnh với không khí làm nó bị nhiễm điện, từ đó hút bụi bông xung quanh.' }
    ],
    contentMarkdown: `
### 1. Kiến thức cốt lõi
* **Vật nhiễm điện:** Nhiều vật sau khi cọ xát có khả năng hút các vật khác (đặc biệt là vật nhỏ, nhẹ) hoặc phóng tia lửa điện. Ta nói vật đó đã bị nhiễm điện (mang điện tích).
* **Hai loại điện tích:** Có hai loại điện tích là điện tích dương (kí hiệu là $+$) và điện tích âm (kí hiệu là $-$).
* **Tương tác điện tích:**
  * Các vật nhiễm điện **cùng loại** thì **đẩy nhau**.
  * Các vật nhiễm điện **khác loại** thì **hút nhau**.
* **Giải thích bằng thuyết electron:**
  * Bình thường, các nguyên tử trung hòa về điện (số proton bằng số electron).
  * Khi cọ xát, electron có thể dịch chuyển từ vật này sang vật khác.
  * Vật **mất bớt electron** $\\rightarrow$ nhiễm điện **dương (+)**.
  * Vật **nhận thêm electron** $\\rightarrow$ nhiễm điện **âm (-)**.

### 2. Các dạng bài tập điển hình
* **Dạng 1: Xác định điện tích của các vật dựa trên hiện tượng hút/đẩy.** Áp dụng quy tắc: cùng dấu đẩy, trái dấu hút.
* **Dạng 2: Giải thích sự dịch chuyển electron khi cọ xát.** Xác định vật nào nhường e, vật nào nhận e.
`
  }
};
