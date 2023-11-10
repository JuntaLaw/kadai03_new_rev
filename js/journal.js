document.addEventListener('DOMContentLoaded', function () {
    // ローカルストレージから保存された結果とクリック時間を取得し表示する
    function displaySavedResult() {
      const result = JSON.parse(localStorage.getItem('result'));
      const clickTime = localStorage.getItem('clickTime');
      if (result && clickTime) {
        // Dateオブジェクトを作成
        const date = new Date(parseInt(clickTime));
        
        // yyyy年mm月dd日 hh時mm分の形式で日時をフォーマットする
        const formattedDate = 
          `${date.getFullYear()}年` +
          `${('0' + (date.getMonth() + 1)).slice(-2)}月` +
          `${('0' + date.getDate()).slice(-2)}日 ` +
          `${('0' + date.getHours()).slice(-2)}時` +
          `${('0' + date.getMinutes()).slice(-2)}分`;
  
        // フォーマットされた文字列をページに表示
        document.getElementById('resultDate').textContent = formattedDate;
        document.getElementById('resultTitle').textContent = result.title;
      }
    } 
  // 関数を実行する
  displaySavedResult(); 
}); 

document.addEventListener('DOMContentLoaded', function() {
  
  
  // ローカルストレージから履歴を読み込んで表示する
  
  const dataArea = document.querySelector('.data-area');
  const savedMemos = JSON.parse(localStorage.getItem('memos')) || []; 

  savedMemos.forEach(memo => {
    displayMemo(memo);
  }); 

// メモをセーブする処理
document.getElementById('savememo-button').addEventListener('click', function() {
  const date = document.getElementById('resultDate').textContent;
  const result = document.getElementById('resultTitle').textContent;
  const text = document.getElementById('textarea').value;
  const memo = { date, result, text };

  const memos = JSON.parse(localStorage.getItem('memos')) || [];
  memos.push(memo);
  localStorage.setItem('memos', JSON.stringify(memos));
  document.getElementById('textarea').value = ''; // テキストエリアをクリア

  displayFilteredMemos(filterMemosByPageTitle); // フィルタリングして表示
});

// 特定の条件に合うメモだけをフィルタリングして表示する関数
function displayFilteredMemos(filterCondition) {
  const memos = JSON.parse(localStorage.getItem('memos')) || [];
  dataArea.innerHTML = ''; // 既存のメモ表示をクリア

  const filteredMemos = memos.filter(memo => filterCondition(memo));
  filteredMemos.forEach(displayMemo); // フィルタリングされたメモを表示
}

// ページタイトルを含むメモをフィルタリングする条件
function filterMemosByPageTitle(memo) {
  const pageTitle = document.title; // ページのタイトルを取得
  return memo.result.includes(pageTitle);
} 
// メモを表示する関数
function displayMemo(memo) {
  const memoRecord = document.createElement('div');
  memoRecord.innerHTML = `
    <div class="data_left">
      <div class="date_record">${memo.date}</div>
      <div class="result_record">${memo.result}</div>
    </div>
    <div class="text_record">${memo.text}</div>
  `;
  dataArea.appendChild(memoRecord); // dataAreaはメモを表示するDOM要素のID
}

  // メモをリセットする処理
  document.getElementById('resetmemo-button').addEventListener('click', function() {
    document.getElementById('textarea').value = '';
    document.getElementById('resultDate').textContent = 'date';
    document.getElementById('resultTitle').textContent = '結果';
  });
});





