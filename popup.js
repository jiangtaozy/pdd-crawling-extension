
let fetchThreeMonth = document.getElementById('fetchThreeMonth');

fetchThreeMonth.onclick = function(element) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    let code = `

      link = document.querySelector('input');
      link.click();

      button = document.querySelector('footer.RPR_footerWrapper_-769496290 > button[data-testid="beast-core-button')

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

      td = document.querySelectorAll('td.RPR_tdDay_-769496290');
      loopTd(td)

      iconPrev = document.querySelector('i[data-testid="iconPrev-0"]')
      iconPrev.click();
      
      table = document.querySelectorAll('div.RPR_tableWrapper_-769496290')
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

      link = document.querySelector('input');
      link.click();

      button = document.querySelector('footer.RPR_footerWrapper_-769496290 > button[data-testid="beast-core-button')

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

      table = document.querySelectorAll('div.RPR_tableWrapper_-769496290')
      tdNext = table[1].querySelectorAll('td.RPR_tdDay_-769496290');
      loopTd(tdNext)
    `;
    chrome.tabs.executeScript(
      tabs[0].id,
      {code: code}
    )
  })
};

let changeExactPrice10 = document.getElementById('changeExactPrice10');
let changeExactPrice30 = document.getElementById('changeExactPrice30');
let changeExactPriceForty = document.getElementById('changeExactPriceForty');
let changeExactPriceFifty = document.getElementById('changeExactPriceFifty');

changeExactPrice10.onclick = changeExactPrice('10');
changeExactPrice30.onclick = changeExactPrice('30');
changeExactPriceForty.onclick = changeExactPrice('40');
changeExactPriceFifty.onclick = changeExactPrice('50');

function changeExactPrice(price) {
  return function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      let code = `
        checkBox = document.querySelector('div.KeywordCheckBox_checkBox__7D8ZZ')
        checkBox.click();
        exactButton = document.querySelector('div.KeywordPanel_btns__kaHRQ > span > button.anq-btn.anq-btn-default')
        exactButton.click();
        setTimeout(function(){
          let exactInput = document.querySelector('div.IPT_inputBlockCell_-1816545062 > input[data-testid="beast-core-input-htmlInput"]');
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
      i = 0;
      start = Date.now();
      function clickUnit() {
        unit = document.querySelectorAll("div.SearchUnitTable_adName__taldH > span.SearchUnitTable_pointer__2ZZ-Q");
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

let changeCrowd10 = document.getElementById('changeCrowd10');
let changeCrowdThirty = document.getElementById('changeCrowdThirty');
let changeCrowdForty = document.getElementById('changeCrowdForty');
let changeCrowdSixty = document.getElementById('changeCrowdSixty');
let changeCrowd120 = document.getElementById('changeCrowd120');
let changeCrowd175 = document.getElementById('changeCrowd175');
let changeCrowd300 = document.getElementById('changeCrowd300');
let changeCrowdCutTen = document.getElementById('changeCrowdCutTen');
let changeCrowdAddTen = document.getElementById('changeCrowdAddTen');
let changeCrowdCut33 = document.getElementById('changeCrowdCut33');
let changeCrowdAdd33 = document.getElementById('changeCrowdAdd33');

changeCrowd10.onclick = changeCrowdPrice(10);
changeCrowdThirty.onclick = changeCrowdPrice(30);
changeCrowdForty.onclick = changeCrowdPrice(40);
changeCrowdSixty.onclick = changeCrowdPrice(60);
changeCrowd120.onclick = changeCrowdPrice(120);
changeCrowd175.onclick = changeCrowdPrice(175);
changeCrowd300.onclick = changeCrowdPrice(300);
changeCrowdCutTen.onclick = changeCrowdPrice(10, true);
changeCrowdAddTen.onclick = changeCrowdPrice(10, false, true);
changeCrowdCut33.onclick = changeCrowdPrice(33, true);
changeCrowdAdd33.onclick = changeCrowdPrice(33, false, true);

function changeCrowdPrice(price, isCut, isAdd) {
  return function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      let code = `
        crowdButton = document.querySelectorAll('div.TAB_card_-1816545062.TAB_tabItem_-1816545062.TAB_transition_-1816545062');
        crowdButton[1].click();
        changeIcon = document.querySelectorAll('i[data-tracking="93094"]');
        start = Date.now();
        i = 0;
        function changeIconPrice() {
          if(i < changeIcon.length) {
            changeIcon[i].click();
            setTimeout(function() {
              popup = document.querySelector('div.PP_popoverContent_-1816545062');
              priceInput = popup.querySelector('input.IPT_input_-1816545062');
              if(${isCut}) {
                priceInput.value = parseInt(priceInput.value) - ${price};
              } else if(${isAdd}) {
                priceInput.value = parseInt(priceInput.value) + ${price};
              } else {
                priceInput.value = ${price};
              }
              priceInput.dispatchEvent(new Event("change", { bubbles: true }));
              priceInput.dispatchEvent(new Event("blur", { bubbles: true }));
              confirmButton = popup.querySelector('button.BTN_outerWrapper_-1816545062.BTN_primary_-1816545062.BTN_small_-1816545062.BTN_outerWrapperBtn_-1816545062');
              confirmButton.click();
              i++;
              setTimeout(function() {
                changeIconPrice();
              }, 600);
            }, 10);
          } else {
            now = Date.now();
            usedTime = (now - start) / 1000;
            alert('操作完成，用时：' + usedTime + 's，' + (Math.round(usedTime / i * 100) / 100) + 's/个');
          }
        }
        changeIconPrice();
      `;
      chrome.tabs.executeScript(
        tabs[0].id,
        {code: code}
      );
    });
  }
}

// 修改出价
let priceAddOneCentButton = document.getElementById('priceAddOneCent');
let priceAddTwoCentButton = document.getElementById('priceAddTwoCent');
let priceAddFourCentButton = document.getElementById('priceAddFourCent');
let priceAddEightCentButton = document.getElementById('priceAddEightCent');
let priceCutOneCentButton = document.getElementById('priceCutOneCent');
let selectedPriceAddOneCentButton = document.getElementById('selectedPriceAddOneCent');
let selectedPriceCutOneCentButton = document.getElementById('selectedPriceCutOneCent');
let priceChangeToTenCentButton = document.getElementById('priceChangeToTenCent');
priceAddOneCentButton.onclick = changeOneCent(0.01, true);
priceAddTwoCentButton.onclick = changeOneCent(0.02, true);
priceAddFourCentButton.onclick = changeOneCent(0.04, true);
priceAddEightCentButton.onclick = changeOneCent(0.08, true);
priceCutOneCentButton.onclick = changeOneCent(0.01, true, true);
selectedPriceAddOneCentButton.onclick = changeOneCent(0.01, false);
selectedPriceCutOneCentButton.onclick = changeOneCent(0.01, false, true);
priceChangeToTenCentButton.onclick = changeOneCent(0.1, true, false, true);
function changeOneCent(price, selectAll, isCut, isChangeTo) {
  return function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      let code = `
        if(${selectAll}) {
          checkBox = document.querySelector('div.KeywordCheckBox_checkBox__7D8ZZ')
          checkBox.click();
        }
        priceButton = document.querySelector('div.KeywordPanel_btns__kaHRQ > button.anq-btn-default')
        priceButton.click();
        iconIndex = 1;
        if(${isCut}) {
          iconIndex = 2;
        } else if(${isChangeTo}) {
          iconIndex = 0;
        }
        iconPrice = document.querySelector('div.changeModal_modalBody__fy9aI.changeModal_flexStart__NrXei').querySelectorAll('label')[iconIndex];
        iconPrice.click();
        inputIndex = 0;
        if(${isCut}) {
          inputIndex = 1;
        }
        inputPrice = document.querySelectorAll('span.ant-input-wrapper > input.ant-input')[inputIndex];
        if(${isChangeTo}) {
          inputPrice = document.querySelectorAll('div.IPT_inputBlockCell_-769496290 > input.IPT_input_-769496290')[2];
        }
        inputPrice.value = ${price};
        inputPrice.dispatchEvent(new Event("change", { bubbles: true }));
        inputPrice.dispatchEvent(new Event("blur", { bubbles: true }));
        commitButton = document.querySelector('div.changeModal_footer__3F7t9 > button.BTN_outerWrapper_17eihtg.BTN_primary_17eihtg.BTN_medium_17eihtg.BTN_outerWrapperBtn_17eihtg');
        commitButton.click();
        reConfirmButton = document.querySelector('div.changeModal_popConfirmFooter__3soJB > button.BTN_outerWrapper_17eihtg.BTN_primary_17eihtg.BTN_small_17eihtg.BTN_outerWrapperBtn_17eihtg');
        reConfirmButton.click();
      `;
      chrome.tabs.executeScript(
        tabs[0].id,
        {code: code}
      );
    });
  }
}

// 出价
let priceAddOneButton = document.getElementById('priceAddOne');
priceAddOneButton.onclick = priceAddOne();
function priceAddOne() {
  return function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      let code = `
        priceAddOneButton = document.querySelector('.ICN_outerWrapper_17eihtg.ICN_type-edit_17eihtg');
        priceAddOneButton.click();
        inputPriceAdd = document.querySelector('div.PT_portalMain_17eihtg.PP_popoverMain_17eihtg').querySelector('input.IPT_input_17eihtg');
        setTimeout(function() {
          inputPriceAdd.setAttribute('value', (parseInt(inputPriceAdd.value) + 1).toString());
          inputPriceAdd.dispatchEvent(new Event("change", { bubbles: true }));
          inputPriceAdd.dispatchEvent(new Event("blur", { bubbles: true }));
          confirmButton = document.querySelector('div.PT_portalMain_17eihtg.PP_popoverMain_17eihtg').querySelector('button.BTN_outerWrapper_17eihtg.BTN_primary_17eihtg.BTN_small_17eihtg.BTN_outerWrapperBtn_17eihtg');
          //confirmButton.click();
        }, 1000)
      `;
      chrome.tabs.executeScript(
        tabs[0].id,
        {code: code}
      );
    });
  }
}

// 推广重置
let adResetButton = document.getElementById('adReset');
adResetButton.onclick = adReset();
function adReset() {
  return function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      let code = `
        // 智能词包
        aiKeysButton = document.querySelector('.SIH_outerWrapper_17eihtg.SIH_medium_17eihtg.SIH_active_17eihtg');
        if(aiKeysButton) {
          aiKeysButton.click();
        }
        setTimeout(function() {
          aiKeysConfirmButton = document.querySelector('.BTN_outerWrapper_17eihtg.PP_popoverOk_17eihtg.BTN_primary_17eihtg.BTN_small_17eihtg.BTN_outerWrapperBtn_17eihtg');
          if(aiKeysConfirmButton) {
            aiKeysConfirmButton.click();
          }
          // 流量拓展包
          flowButton = document.querySelector('.SIH_outerWrapper_17eihtg.SIH_medium_17eihtg.SIH_active_17eihtg');
          if(flowButton) {
            flowButton.click();
          }
          setTimeout(function() {
            flowConfirmButton = document.querySelector('.BTN_outerWrapper_17eihtg.PP_popoverOk_17eihtg.BTN_primary_17eihtg.BTN_small_17eihtg.BTN_outerWrapperBtn_17eihtg');
            if(flowConfirmButton) {
              flowConfirmButton.click()
            }
            // 关键词
            allKeysCheckbox = document.querySelector('.CBX_outerWrapper_17eihtg.CBX_checkbox_17eihtg.CBX_medium_17eihtg.CBX_active_17eihtg');
            if(allKeysCheckbox) {
              allKeysCheckbox.click();
            }
            // 自定义出价
            priceCheckboxList = document.querySelectorAll('.RD_outerWrapper_17eihtg.RD_large_17eihtg.RD_radio_17eihtg');
            customPriceCheckbox = priceCheckboxList[priceCheckboxList.length - 1];
            if(customPriceCheckbox) {
              customPriceCheckbox.click();
            }
            setTimeout(function() {
              writeButtonList = document.querySelectorAll('.ICN_outerWrapper_17eihtg.ICN_type-edit_17eihtg');
              customPriceWriteButton = writeButtonList[1];
              if(customPriceWriteButton) {
                customPriceWriteButton.click();
              }
              inputList = document.querySelectorAll('.IPT_input_17eihtg');
              customPriceInput = inputList[1];
              customPriceInput.setAttribute('value', 0.1);
              customPriceInput.dispatchEvent(new Event("change", { bubbles: true }));
              customPriceInput.dispatchEvent(new Event("blur", { bubbles: true }));
              // 自动调价
              autoPriceCheckbox = document.querySelector('.SIH_outerWrapper_17eihtg.SIH_medium_17eihtg.SIH_active_17eihtg');
              if(autoPriceCheckbox) {
                autoPriceCheckbox.click();
              }
              setTimeout(function() {
                autoPriceConfirmButton = document.querySelector('.BTN_outerWrapper_17eihtg.PP_popoverOk_17eihtg.BTN_primary_17eihtg.BTN_small_17eihtg.BTN_outerWrapperBtn_17eihtg');
                if(autoPriceConfirmButton) {
                  autoPriceConfirmButton.click();
                }
                // 人群溢价
                groupCheckboxList = document.querySelectorAll('.CBX_outerWrapper_17eihtg.CBX_checkbox_17eihtg.CBX_medium_17eihtg.CBX_active_17eihtg');
                for(let i = 0; i < groupCheckboxList.length; i++) {
                  groupCheckboxList[i].click();
                }
              }, 500);
            }, 500);
          }, 500);
        }, 500);
      `;
      chrome.tabs.executeScript(
        tabs[0].id,
        {code: code}
      );
    });
  }
}
