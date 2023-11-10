
// ローカルストレージから占い結果と日時のデータを取得 
const storedResult = JSON.parse(localStorage.getItem('sharedData'));
const storedDate = localStorage.getItem('clickTime');

// タイムスタンプを日付に変換
const date = new Date(parseInt(storedDate));
const dateString = `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()} ${date.getHours()}時${date.getMinutes()}分`;

// ジャーナルページのHTML要素に占い結果と日付のデータを挿入
document.getElementById('resultTitle').textContent = `結果：${sharedData.title}`; 
document.getElementById('resultDate').textContent = `引いた日時：${dateString}`; 

// document.addEventListener('DOMContentLoaded', () => {
//     const saveButton = document.getElementById('savememo-button');
//     const resetButton = document.getElementById('resetmemo-button');
//     const textarea = document.getElementById('textarea');
//     const dateRecordDiv = document.querySelector('.date_record');
//     const resultRecordDiv = document.querySelector('.result_record');
//     const dataAreaDiv = document.querySelector('.data-area');
    
//     // ページ読み込み時に履歴を表示
//     loadHistory();
//   });

    // ローカルストレージから履歴を読み込み、表示する
    function loadHistory() {
      const history = JSON.parse(localStorage.getItem('memoHistory')) || [];
      dataAreaDiv.innerHTML = history.map(entry => {
        return `<div class="data_left">
                  <div class="date_record">${entry.date}</div>
                  <div class="result_record">${entry.result}</div>
                </div>
                <div class="text_record">${entry.text}</div>`;
      }).join('');
    }
  
    // メモをセーブする機能
    saveButton.addEventListener('click', () => {
      const date = document.getElementById('resultDate').innerText;
      const result = document.getElementById('resultTitle').innerText;
      const text = textarea.value;
      
      const newEntry = { date, result, text };
      const history = JSON.parse(localStorage.getItem('memoHistory')) || [];
      history.push(newEntry);
      localStorage.setItem('memoHistory', JSON.stringify(history));
      
      // 保存したメモを表示エリアに追加
      loadHistory();
  
      // テキストエリアをクリア
      textarea.value = '';
    });
  
    // メモをリセットする機能
    resetButton.addEventListener('click', () => {
      textarea.value = '';
      dateRecordDiv.innerText = 'date';
      resultRecordDiv.innerText = '結果';
      localStorage.removeItem('memoHistory'); // ローカルストレージから履歴を削除
      dataAreaDiv.innerHTML = ''; // 表示エリアをクリア
    });

  