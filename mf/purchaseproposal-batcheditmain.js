/**
 * Name: purchaseproposal-batcheditmain.js
 * Path: /ART/ie50/Purchase/PurchaseProposal/BatchEdit/BatchEditMain.aspx
 * Mod: <script type="text/javascript" src="https://kasperlkopf.github.io/mf/purchaseproposal-batcheditmain.js"></script>
 */

function gbConfirmYesNo(sMsg) {
  // auto-confirm if price change
  if (sMsg == msTerms[20]) {
    return true
  }

    if (!gbBrowserSupportsModalWindows())
        return (window.confirm(sMsg));

    var lRes = glMsgBox(sMsg, 36, '');
    return (lRes == 6)
}
