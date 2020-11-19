
let fetchThreeMonth = document.getElementById('fetchThreeMonth');

fetchThreeMonth.onclick = function(element) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    let code = `
      iframe = document.querySelector("iframe.pmsIframe").contentDocument;

      link = iframe.querySelector('input');
      link.click();

      button = iframe.querySelector('footer.RPR_footerWrapper_-769496290 > button[data-testid="beast-core-button')

      loopTd = (td) => {
        for(let i = 0; i < td.length; i++) {
          if(td[i].classList.contains('RPR_outOfMonth_-769496290') ||
            td[i].classList.contains('RPR_disabled_-769496290') ||
            td[i].classList.contains('RPR_today_-769496290')) {
            continue;
          }
          td[i].click();
          td[i].click();
          button.click();
          link.click();
        }
      }

      td = iframe.querySelectorAll('td.RPR_tdDay_-769496290');
      loopTd(td)

      iconPrev = iframe.querySelector('i[data-testid="iconPrev-0"]')
      iconPrev.click();
      
      table = iframe.querySelectorAll('div.RPR_tableWrapper_-769496290')
      tdPrev = table[0].querySelectorAll('td.RPR_tdDay_-769496290');
      loopTd(tdPrev)

      iconPrev.click();
      loopTd(tdPrev)

    `;
    chrome.tabs.executeScript(
      tabs[0].id,
      {code: code}
    )
  })
};

let fetchThisMonth = document.getElementById('fetchThisMonth');

fetchThisMonth.onclick = function(element) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    let code = `
      iframe = document.querySelector("iframe.pmsIframe").contentDocument;

      link = iframe.querySelector('input');
      link.click();

      button = iframe.querySelector('footer.RPR_footerWrapper_-769496290 > button[data-testid="beast-core-button')

      loopTd = (td) => {
        for(let i = 0; i < td.length; i++) {
          if(td[i].classList.contains('RPR_outOfMonth_-769496290') ||
            td[i].classList.contains('RPR_disabled_-769496290') ||
            td[i].classList.contains('RPR_today_-769496290')) {
            continue;
          }
          td[i].click();
          td[i].click();
          button.click();
          link.click();
        }
      }

      table = iframe.querySelectorAll('div.RPR_tableWrapper_-769496290')
      tdNext = table[1].querySelectorAll('td.RPR_tdDay_-769496290');
      loopTd(tdNext)
    `;
    chrome.tabs.executeScript(
      tabs[0].id,
      {code: code}
    )
  })
};

let changePrice = document.getElementById('changePrice');
let changePriceForty = document.getElementById('changePriceForty');
let changePriceFifty = document.getElementById('changePriceFifty');

changePrice.onclick = changeExactPrice('30');
changePriceForty.onclick = changeExactPrice('40');
changePriceFifty.onclick = changeExactPrice('50');

function changeExactPrice(price) {
  return function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      let code = `
        iframe = document.querySelector("iframe.pmsIframe").contentDocument;
        checkBox = iframe.querySelector('div.KeywordCheckBox_checkBox__7D8ZZ')
        checkBox.click();
        exactButton = iframe.querySelector('div.KeywordPanel_btns__kaHRQ > span > button.BTN_outerWrapper_-769496290')
        exactButton.click();
        setTimeout(function(){
          let exactInput = document.querySelector('div.IPT_inputBlockCell_-769496290 > input[data-testid="beast-core-input-htmlInput"]');
          exactInput.setAttribute('value', ${price});
          exactInput.dispatchEvent(new Event("change", { bubbles: true }));
          exactInput.dispatchEvent(new Event("blur", { bubbles: true }));
          setTimeout(function() {
            confirmButton = document.querySelector('div.premiumDrawer_footer__2Aux1 > button.ant-btn-primary');
            confirmButton.click();
            setTimeout(function() {
              againConfirmButton = document.querySelector('div.premiumDrawer_popConfirmFooter__ZM8cv > button.ant-btn-primary');
              againConfirmButton.click();
            }, 10);
          }, 10);
        }, 10);
      `;
      chrome.tabs.executeScript(
        tabs[0].id,
        {code: code}
      );
    });
  }
}

let loopUnit = document.getElementById('loopUnit');

loopUnit.onclick = function(element) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    let code = `
      iframe = document.querySelector("iframe.pmsIframe").contentDocument;
      i = 0;
      start = Date.now();
      function clickUnit() {
        unit = iframe.querySelectorAll("div.SearchUnitTable_adName__taldH > span.SearchUnitTable_pointer__2ZZ-Q");
        if(i < unit.length / 2) {
          unit[i].click();
          setTimeout(function() {
            chrome.extension.sendMessage("goback");
            i++;
            setTimeout(function() {
              clickUnit();
            }, 100);
          }, 100);
        } else {
          now = Date.now();
          usedTime = (now - start) / 1000;
          alert('遍历完成，用时：' + usedTime + 's，' + (Math.round(usedTime / i * 100) / 100) + 's/个');
        }
      }
      clickUnit();
    `;
    chrome.tabs.executeScript(
      tabs[0].id,
      {code: code}
    )
  })
};
