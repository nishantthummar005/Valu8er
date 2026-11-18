<!--
  CcfCalculator.vue: Notional vs. open market value calculator (CCF).
  Self-contained: no props, no dependencies. Works with Vue 3 (and Vue 2.6+).
  Styles are namespaced under the component's root class, so they won't affect the rest of the site.
-->
<template>
  <div v-pre class="v8c">
<div class="wrap">

<h1>Notional value vs. open-market reality</h1>
<p class="lede">A capitalized cash flow (CCF) valuation and an open-market buyer can look at the same business and reach very different numbers. Enter a business's figures below to see both side by side, and how much two judgment-based inputs, the debt weighting and the company-specific risk premium, move the result. Cells shaded yellow are discretionary.</p>

<div class="card">
  <h2>Why the likely buyer matters <span style="font-weight:400;color:var(--muted)">(determines EBITDA vs SDE Valuation)</span></h2>
  <p>Dr. Howard E. Johnson, FCPA, FCBV (‘HJ’) <span class="hjbtn hjbadge" aria-hidden="true">HJ</span>, author of <i>Business Valuation in Canada</i> (CPA Canada, 2021), encourages valuators to approach a mandate from the perspective of how likely buyers would assess value, so that notional conclusions stay reasonable when compared with open-market reality.</p>
  <p>International Valuation Standards <span class="hjbtn hjbadge ivsbadge" aria-hidden="true">IVS</span> (IVS 103, para. A10.08) identify the first step in the comparable transactions method as finding the units of comparison the market actually uses, such as revenue, EBITDA or SDE.</p>
  <p style="margin:0">For smaller businesses, the most common buyer is a prospective owner-operator who buys a business and a job, and prices it on the take-home earnings it will provide. A Valu8er analysis of DealStats <span class="hjbtn hjbadge dsbadge" aria-hidden="true">DealStats</span> data found that about 78% of businesses with revenues between $100,000 and $3 million sold as a multiple of SDE, not EBITDA. Many sold for goodwill even though their EBITDA was zero or negative.</p>
</div>

<div class="grid">
<div>

<div class="caution" role="note">
  <div class="caution-h"><i aria-hidden="true">!</i>Caution from Dr. Howard E. Johnson <span class="hjbtn hjbadge" aria-hidden="true">HJ</span> regarding the CCF Methodology</div>
  <p>As per Dr. Howard Johnson, determining valuation in a notional setting using the Capitalized Cash Flows (‘CCF’) Methodology can result in impairment of credibility when open market reality is not taken into account, as the CCF on its own is an academic and arithmetic exercise in nature. Therefore, the goodwill conclusion arrived at using the CCF should be corroborated to the goodwill payback period of comparable transactions.</p>
</div>

<!-- STEP 1 -->
<div class="card">
  <div class="step"><span class="num">1</span><h2>What kind of business is this?</h2></div>
  <p class="hint">The likely buyer decides which earnings measure applies. Owner-operators buy to work <i>in</i> the business and look at Seller's Discretionary Earnings (SDE). Private equity, investment firms and competitors buy to work <i>on</i> the business and deduct a market salary to replace the owner, which gives EBITDA.</p>
  <div class="opts" id="opts">
    <label class="opt"><input type="radio" name="btype" value="1" checked><div><b>1 - Small owner-operated business (SDE)</b><span>Likely buyer: a prospective owner-operator. No deduction for the owner's market salary.</span></div></label>
    <label class="opt"><input type="radio" name="btype" value="2"><div><b>2 - Medium-to-large business (EBITDA)</b><span>Likely buyer: private equity, an investment firm or a competitor. Owner replaced at market salary.</span></div></label>
    <label class="opt"><input type="radio" name="btype" value="3"><div><b>3 - Small owner-operated business (force EBITDA) <button type="button" class="hjbtn dsbtn" data-pop="dsPopOpt" aria-expanded="false" aria-controls="dsPopOpt" title="Guidance from DealStats analysis">DealStats</button></b>
      <span class="hjpop down dspop optpop" id="dsPopOpt" role="dialog" aria-label="Guidance from DealStats analysis" hidden>
        <span class="hjhead">Guidance from DealStats<button type="button" class="hjx" aria-label="Close">×</button></span>
        <span class="ivsl" style="display:block;margin:0">As per an analysis of thousands of businesses sold and listed on DealStats, approximately 78% of businesses sold with revenues between $100,000 and $3 Million in the USA and Canada sold for a multiple of SDE.</span>
        <span class="hjint" style="display:block;margin-top:10px"><b>Interpretation:</b> Unless you have a convincing reason as to why a private equity firm, investment bank or larger competitor would buy the business, it is suggested to use Methodology #1 (SDE).</span>
      </span><span>An EBITDA basis applied to an owner-operated business, deducting a market salary the likely buyer would not pay.</span></div></label>
  </div>
</div>

<!-- STEP 2 -->
<div class="card">
  <div class="step"><span class="num">2</span><h2>Company facts</h2></div>
  <div class="kv">
    <label for="tax">Corporate tax rate</label><input type="number" id="tax" value="11.2" step="0.1">
    <div class="lblwrap"><label for="tab">Net Tangible Business Assets (TAB)</label> <button type="button" class="hjbtn" data-pop="hjPopTab" aria-expanded="false" aria-controls="hjPopTab" title="Guidance from Howard Johnson">HJ</button>
      <div class="hjpop down" id="hjPopTab" role="dialog" aria-label="Guidance from Howard Johnson" hidden>
        <div class="hjhead">Guidance from Howard Johnson<button type="button" class="hjx" aria-label="Close">×</button></div>
        <blockquote>“Working capital is…. always a negotiated amount.”</blockquote>
        <div class="hjsrc">– Howard Johnson, CBV Connect 2023 keynote</div>
        <div class="hjint"><b>Interpretation:</b> Net TAB should represent the net assets that a buyer would want and require as part of the business purchase.</div>
      </div></div><input type="text" inputmode="decimal" id="tab" class="money" value="250,000">
    <div class="lblwrap"><label for="capex">Annual sustaining capital expenditures, net of tax shield</label> <button type="button" class="hjbtn bankbtn" data-pop="bankPop" aria-expanded="false" aria-controls="bankPop">100% Bank Funded</button>
      <div class="hjpop down bankpop" id="bankPop" role="dialog" aria-label="100% Bank Funded" hidden>
        <div class="hjhead">100% Bank Funded<button type="button" class="hjx" aria-label="Close">×</button></div>
        <p class="ivsl" style="margin:0">Often, banks will fund 100% of tangible assets, and therefore, capital expenditures are not paid out of cash flows, but rather, are amortized over a term loan and paid off slowly. Accordingly, real buyers do not reduce EBITDA for capital expenditures.</p>
      </div></div><input type="text" inputmode="decimal" id="capex" class="money" value="80,000">
    <label for="shield">Present value of existing tax shield</label><input type="text" inputmode="decimal" id="shield" class="money" value="10,000">
    <label for="redund">Redundant assets</label><input type="text" inputmode="decimal" id="redund" class="money" value="300,000">
    <label for="debtAmt">Debt</label><input type="text" inputmode="decimal" id="debtAmt" class="money neg-in" value="-100,000">
    <label for="pref">Preferred shares redemption value</label><input type="text" inputmode="decimal" id="pref" class="money neg-in" value="-150,000">
    <label for="othCo">Add / Less: Other Adjustments to Share Value</label><input type="text" inputmode="decimal" id="othCo" class="money" value="0">
  </div>
</div>

<!-- STEP 3 -->
<div class="card">
  <div class="step"><span class="num">3</span><h2>Financial results and normalization</h2></div>
  <div class="fin" style="overflow-x:auto">
  <table>
    <thead><tr><th></th><th>TTM / latest</th><th>1 yr prior</th><th>2 yrs prior</th><th>3 yrs prior</th><th>4 yrs prior</th></tr></thead>
    <tbody id="finBody"></tbody>
  </table>
  </div>
  <p class="hint" style="margin-top:12px"><b>Weighting:</b> Open-market buyers focus on the trailing twelve months (TTM). Many notional valuations weight several historical years. Set every year except TTM to 0 to use TTM only. <span id="wTtm"></span></p>
</div>

<!-- STEP 4 -->
<div class="card" id="cocCard" style="position:relative">
  <svg class="dgLink" id="dgSvg" aria-hidden="true"></svg>
  <div class="dgWrap" id="dgWrap">
    <button type="button" class="dgbtn" data-pop="dgPop" aria-expanded="false" aria-controls="dgPop">Dictates the Goodwill Value</button>
    <div class="hjpop dgpop" id="dgPop" role="dialog" aria-label="Dictates the Goodwill Value" hidden>
      <div class="hjhead">Dictates the Goodwill Value<button type="button" class="hjx" aria-label="Close">×</button></div>
      <div class="ivsl">At the valuator's discretion using professional judgment, the values for company specific risk premium and/or debt portion of capital can be changed to an indefinite number of possibilities, resulting in an indefinite number of values for Goodwill Value and Goodwill Payback Period. Ultimately, the valuator should continue to tinker around with these values until arriving at a Goodwill Payback Period that is reasonable and supported.</div>
    </div>
  </div>
  <div class="step lblwrap"><span class="num">4</span><h2>Cost of capital (notional CCF)</h2><button type="button" class="hjbtn ivsbig" data-pop="ivsPopCoc" aria-expanded="false" aria-controls="ivsPopCoc" title="Guidance from International Valuation Standards">IVS</button><button type="button" class="hjbtn hjbig" data-pop="hjPopCoc" aria-expanded="false" aria-controls="hjPopCoc" title="Guidance from Howard Johnson">HJ</button>
    <div class="hjpop down coc" id="hjPopCoc" role="dialog" aria-label="Guidance from Howard Johnson" hidden>
      <div class="hjhead">Guidance from Howard Johnson<button type="button" class="hjx" aria-label="Close">×</button></div>
      <blockquote>“…considering the dynamics of how open market transactions are consummated and the factors that buyers consider will help the valuator ensure that a notional market conclusion is realistic and supportable, rather than simply the outcome of a purely academic exercise.”</blockquote>
      <div class="hjsrc">– Howard E. Johnson, <i>Business Valuation in Canada</i> (CPA Canada, 2021)</div>
      <div class="hjint"><b>Interpretation:</b> The following exercise is academic and arithmetic in nature, with an indefinite number of possibilities. Ultimately, the valuator must satisfy themself that the goodwill payback period concluded upon is reasonable and logical in light of the goodwill payback period of comparable businesses sold.</div>
    </div>
    <div class="hjpop ivspop down coc" id="ivsPopCoc" role="dialog" aria-label="Guidance from International Valuation Standards" hidden>
      <div class="hjhead">Guidance from International Valuation Standards<button type="button" class="hjx" aria-label="Close">×</button></div>
      <p class="ivsl"><b>As per IVS 103, paras. 10.07, 10.09 and 10.10:</b> A valuator should analyze and reconcile differing values into a single conclusion, without averaging and that it is generally not appropriate to simply weigh two significantly ‘divergent’ indications.</p>
      <div class="hjsrc" style="margin-left:0">Source: International Valuation Standards (effective 31 January 2028), Exposure Draft</div>
      <div class="hjint"><b>Interpretation:</b> If using multiple approaches, and the comparable transactions methodology provides a conclusion that is significantly different from the CCF (WACC) methodology, then the valuator should reconcile that difference (and not take an average). In other words, the valuator should tinker around with the company specific risk and/or debt portion of capital until concluding upon a goodwill payback period that is reasonable and supportable.</div>
    </div></div>
  <h3>Cost of debt</h3>
  <div class="kv">
    <label for="prime">Prime rate</label><input type="number" id="prime" value="5" step="0.1">
    <label for="dprem">Borrowing premium over prime</label><input type="number" id="dprem" value="1.5" step="0.1">
    <span class="cl">Pre-tax cost of debt</span><span class="cv" id="kdPre"></span>
    <span class="cl" id="kdTaxL">Less: taxes</span><span class="cv" id="kdTax"></span>
    <span class="cl tot">Cost of debt (C)</span><span class="cv tot" id="kdOut"></span>
  </div>
  <h3>Cost of equity</h3>
  <div class="kv">
    <label for="rf">Risk-free rate</label><input type="number" id="rf" value="3" step="0.1">
    <label for="erp">Equity risk premium</label><input type="number" id="erp" value="4.8" step="0.1">
    <label for="size">Size premium</label><input type="number" id="size" value="6" step="0.1">
    <label for="ind">Industry premium</label><input type="number" id="ind" value="0.5" step="0.1">
    <label for="ctry">Country premium</label><input type="number" id="ctry" value="0" step="0.1">
    <label for="csr"><b>Company-specific risk premium</b></label><input type="number" id="csr" class="disc" value="25" step="1">
    <span class="cl tot">Cost of equity (D)</span><span class="cv tot" id="keOut"></span>
    <div class="livepb"><span class="livepb-in" id="livePb"></span></div>
  </div>
  <h3>Weighted average cost of capital (WACC)</h3>
  <table class="wacc">
    <tbody>
      <tr><td>Cost of debt</td><td class="lt">C</td><td id="wC"></td></tr>
      <tr><td>× Debt portion of capital</td><td class="lt">E</td><td class="inp"><input type="number" id="debt" class="disc" value="10" step="1"></td></tr>
      <tr class="sub"><td>Weighted cost of debt</td><td class="lt">F = C × E</td><td id="wE"></td></tr>
      <tr><td>Cost of equity</td><td class="lt">D</td><td id="wF"></td></tr>
      <tr><td>× Equity portion of capital</td><td class="lt">G = 1 − E</td><td id="wG"></td></tr>
      <tr class="sub"><td>Weighted cost of equity</td><td class="lt">H = D × G</td><td id="wH"></td></tr>
      <tr class="sub"><td>WACC before growth</td><td class="lt">I = F + H</td><td id="wI"></td></tr>
      <tr><td>Less: growth rate (inflation plus real)</td><td class="lt">J</td><td class="inp"><input type="number" id="growth" class="neg-in" value="-2" step="0.1" max="0"></td></tr>
      <tr class="tot"><td>Weighted average cost of capital (WACC)</td><td class="lt" style="position:relative"><button type="button" class="hjbtn ivsbtn" data-pop="ivsPopWacc" aria-expanded="false" aria-controls="ivsPopWacc" title="Guidance from International Valuation Standards">IVS</button>
        <div class="hjpop ivspop" id="ivsPopWacc" role="dialog" aria-label="Guidance from International Valuation Standards" hidden>
          <div class="hjhead">Guidance from International Valuation Standards<button type="button" class="hjx" aria-label="Close">×</button></div>
          <p class="ivsl"><b>IVS 103, para. 10.06:</b> Since WACC on its own does not provide a reliable conclusion (i.e. it is mere arithmetic on its own), the valuator should follow IVS 103 10.06 and use a second approach (preferably the Comparable Transactions Method) to corroborate the reasonableness of the WACC conclusion.</p>
          <p class="ivsl"><b>IVS 103, paras. 10.11 and 10.13:</b> The valuator should maximize the use of relevant observable market information… price information from an active market is generally considered to be the strongest evidence of value.</p>
          <div class="hjsrc" style="margin-left:0">Source: International Valuation Standards (effective 31 January 2028), Exposure Draft</div>
          <div class="hjint"><b>Interpretation:</b> The ever changing Cash flow multiple will calculate a goodwill payback period conclusion, which should be compared to the goodwill payback period of comparable transactions and adjust for revenue size, profit margin and growth rates.</div>
        </div>K = I − J</td><td id="wK"></td></tr>
      <tr class="tot"><td>Cash flow multiple</td><td class="lt">L = 1 / K</td><td id="wL"></td></tr>
    </tbody>
  </table>
</div>

<!-- STEP 5 -->
<div class="card">
  <div class="step"><span class="num">5</span><h2>Open-market benchmark</h2></div>
  <p class="hint">Shaded green: the open-market benchmark, drawn from comparable sales. Enter the multiple that comparable businesses have sold for, adjusted for revenue size, profit margin and growth. Sources include transaction databases such as DealStats.</p>
  <div class="kv">
    <label for="mkt" id="mktLabel">Market multiple of TTM SDE (x)</label><input type="number" id="mkt" class="disc" value="2.9" step="0.1">
  </div>
</div>

</div>

<!-- RESULTS -->
<div>
<div class="card">
  <h2>Results</h2>
  <div class="compare">
    <div class="panel notional">
      <h4>Notional: capitalized cash flow</h4>
      <div class="row"><span class="l" id="nEarnL">Weighted SDE</span><span id="nEarn"></span></div>
      <div class="row"><span class="l" id="nTaxL">Less tax</span><span id="nTax"></span></div>
      <div class="row"><span class="l">Less sustaining capex</span><span id="nCapex"></span></div>
      <div class="row sum" style="font-weight:600"><span>Maintainable Cash Flows</span><span id="nMcf"></span></div>
      <div id="nRest">
      
      <div class="row"><span class="l">Cash flow multiple</span><span id="nMult"></span></div>
      <div class="row sum" style="font-weight:600"><span>Capitalized Value of Cash Flows</span><span id="nCap"></span></div>
      <div class="row"><span class="l">Add: PV of existing tax shield</span><span id="nShield"></span></div>
      <div class="row sum" style="font-weight:600"><span>Enterprise value</span><span id="nEv"></span></div>
      <div class="row"><span class="l">Less net tangible business assets</span><span id="nTab"></span></div>
      <div class="row sum big"><span class="lblwrap"><span>Goodwill</span> <button type="button" class="hjbtn" data-pop="hjPopGwN" aria-expanded="false" aria-controls="hjPopGwN" title="Guidance from Howard Johnson">HJ</button>
        <span class="hjpop gwpop gl" id="hjPopGwN" role="dialog" aria-label="Guidance from Howard Johnson" hidden>
          <span class="hjhead">Guidance from Howard Johnson<button type="button" class="hjx" aria-label="Close">×</button></span>
          <blockquote>“What you will find is that, in the majority of cases, the value drivers behind a business and the reason that it is of interest, has to do with the intangible elements as opposed to the underlying assets that a business holds.”</blockquote>
          <span class="hjsrc">– Howard Johnson, CBV Connect 2023 keynote</span>
          <span class="hjint"><b>Interpretation:</b> Buyers are not attracted to businesses for their tangible assets (e.g. inventory, equipment and machinery), but rather, it is the Goodwill Value. As a valuator, it is your mandate to provide an opinion on the appropriate Goodwill Value of a business, which is added to tangible assets to arrive at Enterprise Value. Accordingly, the Goodwill Payback Period must be reasonable in context of the goodwill payback period of comparable transactions.</span>
        </span></span><span id="nGw"></span></div>
      <div id="nPbBlock">
      <div class="row"><span class="l" id="nDivL">Divided by weighted SDE</span><span id="nDiv"></span></div>
      <div class="row sum" style="font-weight:600"><span class="lblwrap"><span>Goodwill payback (years)</span> <button type="button" class="hjbtn" data-pop="hjPopPbN" aria-expanded="false" aria-controls="hjPopPbN" title="Guidance from Howard Johnson">HJ</button>
        <span class="hjpop gwpop gl" id="hjPopPbN" role="dialog" aria-label="Guidance from Howard Johnson" hidden>
          <span class="hjhead">Guidance from Howard Johnson<button type="button" class="hjx" aria-label="Close">×</button></span>
          <blockquote>“… fair market value should reasonably reflect what we do see in the open marketplace… Your ultimate end result in valuation should say, ‘this reasonably reflects what a seller could expect to receive for this business in the open marketplace’.”</blockquote>
          <span class="hjsrc">– Howard Johnson, CBV Connect 2023 keynote</span>
          <span class="hjint"><b>Interpretation:</b> In the end, your goodwill payback period should reflect a payback period that a buyer would pay for the business, in light of comparable transactions.</span>
        </span></span><span id="nPb"></span></div>
      </div>
      <div id="nNeg2" style="display:none">
        <div class="negc">Valuator will commonly conclude that since enterprise value is less than net tangible business assets (negative goodwill), there is no goodwill value and that enterprise value is equal to net tangible business asset value of <b id="nNeg2Tab"></b>.</div>
        <div class="row"><span class="l">Net tangible business assets value</span><span id="nNeg2Tab2"></span></div>
        <div class="row"><span class="l">Plus: goodwill value</span><span>$0</span></div>
        <div class="row big sum"><span>Enterprise value</span><span id="nNeg2Val"></span></div>
      </div>
      </div>
      <div id="nNeg" style="display:none">
        <div class="negc">Valuator will commonly conclude that since maintainable cash flows are negative, there is no goodwill value and that enterprise value is equal to net tangible business asset value of <b id="nNegTab"></b>.</div>
        <div class="row"><span class="l">Net tangible business assets value</span><span id="nNegTab2"></span></div>
        <div class="row"><span class="l">Plus: goodwill value</span><span>$0</span></div>
        <div class="row big sum"><span>Enterprise value</span><span id="nNegVal"></span></div>
      </div>
    </div>
    <div class="panel market">
      <h4>Open market: likely buyer</h4>
      <div class="row"><span class="l" id="mBaseL">TTM SDE</span><span id="mBase"></span></div>
      <div class="row"><span class="l">Market multiple</span><span id="mMult"></span></div>
      <div class="row sum" style="font-weight:600"><span>Enterprise value</span><span id="mEv"></span></div>
      <div class="row"><span class="l">Less net tangible business assets</span><span id="mTab"></span></div>
      <div class="row sum big"><span class="lblwrap"><span>Goodwill</span> <button type="button" class="hjbtn" data-pop="hjPopGwM" aria-expanded="false" aria-controls="hjPopGwM" title="Guidance from Howard Johnson">HJ</button>
        <span class="hjpop gwpop gr" id="hjPopGwM" role="dialog" aria-label="Guidance from Howard Johnson" hidden>
          <span class="hjhead">Guidance from Howard Johnson<button type="button" class="hjx" aria-label="Close">×</button></span>
          <blockquote>“What you will find is that, in the majority of cases, the value drivers behind a business and the reason that it is of interest, has to do with the intangible elements as opposed to the underlying assets that a business holds.”</blockquote>
          <span class="hjsrc">– Howard Johnson, CBV Connect 2023 keynote</span>
          <span class="hjint"><b>Interpretation:</b> Buyers are not attracted to businesses for their tangible assets (e.g. inventory, equipment and machinery), but rather, it is the Goodwill Value. As a valuator, it is your mandate to provide an opinion on the appropriate Goodwill Value of a business, which is added to tangible assets to arrive at Enterprise Value. Accordingly, the Goodwill Payback Period must be reasonable in context of the goodwill payback period of comparable transactions.</span>
        </span></span><span id="mGw"></span></div>
      <div class="row"><span class="l" id="mDivL">Divided by TTM SDE</span><span id="mDiv"></span></div>
      <div class="row sum" style="font-weight:600"><span class="lblwrap"><span>Goodwill payback (years)</span> <button type="button" class="hjbtn" data-pop="hjPopPbM" aria-expanded="false" aria-controls="hjPopPbM" title="Guidance from Howard Johnson">HJ</button>
        <span class="hjpop gwpop gr" id="hjPopPbM" role="dialog" aria-label="Guidance from Howard Johnson" hidden>
          <span class="hjhead">Guidance from Howard Johnson<button type="button" class="hjx" aria-label="Close">×</button></span>
          <blockquote>“… fair market value should reasonably reflect what we do see in the open marketplace… Your ultimate end result in valuation should say, ‘this reasonably reflects what a seller could expect to receive for this business in the open marketplace’.”</blockquote>
          <span class="hjsrc">– Howard Johnson, CBV Connect 2023 keynote</span>
          <span class="hjint"><b>Interpretation:</b> In the end, your goodwill payback period should reflect a payback period that a buyer would pay for the business, in light of comparable transactions.</span>
        </span></span><span id="mPb"></span></div>
    </div>
  </div>

  <div class="bars">
    <div class="bar"><span>Notional goodwill</span><div class="track"><div class="fill" id="bN" style="background:var(--accent)"></div></div><span id="bNv" style="text-align:right"></span></div>
    <div class="bar"><span>Market goodwill</span><div class="track"><div class="fill" id="bM" style="background:var(--accent2)"></div></div><span id="bMv" style="text-align:right"></span></div>
  </div>
  <div class="gap" id="gap"></div>
  <div id="msg"></div>
</div>

<div class="card">
  <h2>Business &amp; Share Valuation Conclusion</h2>
  <div class="compare">
    <div class="panel notional">
      <h4>Notional: capitalized cash flow</h4>
      <div class="row"><span class="l">Net tangible business assets</span><span id="cTab"></span></div>
      <div class="row"><span class="l">Plus: goodwill value</span><span id="cGw"></span></div>
      <div class="row sum" style="font-weight:600"><span>Enterprise value</span><span id="cEv"></span></div>
      <div class="row"><span class="l">Plus: redundant assets</span><span id="cRed"></span></div>
      <div class="row"><span class="l">Less: debt</span><span id="cDebt"></span></div>
      <div class="row"><span class="l">Less: preferred shares</span><span id="cPref"></span></div>
      <div class="row"><span class="l">Add / Less: Other Adjustments</span><span id="cOthCo">$0</span></div>
      <div class="row big sum"><span>Company value (share value)</span><span id="cCo"></span></div>
    </div>
    <div class="panel market">
      <h4>Open market: likely buyer</h4>
      <div class="row"><span class="l">Net tangible business assets</span><span id="kTab"></span></div>
      <div class="row"><span class="l">Plus: goodwill value</span><span id="kGw"></span></div>
      <div class="row sum" style="font-weight:600"><span>Enterprise value</span><span id="kEv"></span></div>
      <div class="row"><span class="l">Plus: redundant assets</span><span id="kRed"></span></div>
      <div class="row"><span class="l">Less: debt</span><span id="kDebt"></span></div>
      <div class="row"><span class="l">Less: preferred shares</span><span id="kPref"></span></div>
      <div class="row"><span class="l">Add / Less: Other Adjustments</span><span id="kOthCo">$0</span></div>
      <div class="row big sum"><span>Company value (share value)</span><span id="kCo"></span></div>
    </div>
  </div>
  <div class="gap" id="coGap"></div>
</div>

<div class="card" id="sensCard" style="display:none">
  <h2>Goodwill under different judgment calls</h2>
  <p class="hint">Notional goodwill when only the two yellow inputs change: debt portion of capital (columns) and company-specific risk premium (rows). Everything else stays as entered. The outlined cell is your current setting.</p>
  <div style="overflow-x:auto"><table class="heat" id="heat"></table></div>
  <div class="legend">
    <span><i class="sw" style="background:#e9b7a8"></i>No goodwill (value = net tangible business assets)</span>
    <span><i class="sw" style="background:#cfe0ee"></i>Below market</span>
    <span><i class="sw" style="background:#bfe1d6"></i>Within 15% of market</span>
    <span><i class="sw" style="background:#f3dfa8"></i>Above market</span>
  </div>
  <p class="hint" style="margin-top:10px" id="spread"></p>
</div>
</div>
</div>

<div class="card" id="compCard">
  <div class="lblwrap" style="display:flex;align-items:center;gap:10px;margin-bottom:12px"><h2 style="margin:0">Comparable transactions <span class="hint" style="font-weight:400">(illustrative: hypothetical businesses)</span></h2><button type="button" class="hjbtn dsbtn" data-pop="dsPop" aria-expanded="false" aria-controls="dsPop" title="Guidance from DealStats analysis">DealStats</button><button type="button" class="hjbtn ivsbtn2" data-pop="ivsPopComp" aria-expanded="false" aria-controls="ivsPopComp" title="Guidance from International Valuation Standards">IVS</button>
    <div class="hjpop down ivspop compivs" id="ivsPopComp" role="dialog" aria-label="Guidance from International Valuation Standards" hidden>
      <div class="hjhead">Guidance from International Valuation Standards<button type="button" class="hjx" aria-label="Close">×</button></div>
      <p class="ivsl"><b>As per IVS 103, paras. A10.09 and A10.14,</b> when choosing comparable transactions, the valuator should choose:</p>
      <ol class="ivsol">
        <li>Several comparable transactions</li>
        <li>Transactions that are ‘similar’ to the subject business</li>
        <li>Transactions that happen closer to the Valuation Date</li>
        <li>Information should come from a reliable and trusted source</li>
        <li>Actual transactions provide better valuation evidence than intended or listed transactions</li>
        <li>Publicly traded comparables should only be used when the subject asset is sufficiently similar to the publicly traded comparables to allow for meaningful comparisons</li>
      </ol>
      <div class="hjsrc" style="margin-left:0">Source: International Valuation Standards (effective 31 January 2028), Exposure Draft</div>
      <div class="hjint"><b>Interpretation:</b> Using a reliable source such as DealStats, the valuator should select private companies sold that are similar in size (revenue range) and the sale date is as close to the valuation date as possible. Multiples increase with revenue size, and therefore, it is imperative to select similar sized comparables to avoid over or under valuation.</div>
    </div>
    <div class="hjpop down dspop" id="dsPop" role="dialog" aria-label="Guidance from DealStats analysis" hidden>
      <div class="hjhead">Guidance from DealStats<button type="button" class="hjx" aria-label="Close">×</button></div>
      <p class="ivsl">As per our own analysis of thousands of businesses sold and listed on DealStats, buyers pay greater multiples for larger businesses and more profitable businesses. In other words, multiples increase as revenues increase, and when comparing businesses of a similar size, those with a greater profit margin sell for a greater multiple.</p>
      <div class="hjint"><b>Interpretation:</b> The subject business' revenues and profit margin should be compared to the revenues and profit margin of comparable transactions to conclude upon the reasonableness of the subject business' goodwill payback period.</div>
    </div></div>
  <p class="hint">A likely buyer checks the goodwill payback against what similar businesses have sold for, adjusting for differences in revenue size, profit margin and growth. Edit any figure to use your own comparables.</p>
  <div style="overflow-x:auto"><table class="comps" id="comps"></table></div>
  <p class="gap" id="compNote"></p>
  <div id="biasNote"></div>
</div>

<div class="card" id="intCard">
  <h2>Value of Individual Interest</h2>
  <div class="kv" style="max-width:520px;margin-bottom:14px">
    <label for="own"><b>Individual ownership %</b></label><input type="number" id="own" class="disc" value="30" step="1" min="0" max="100">
    <label for="mdisc"><b>Minority discount</b></label><input type="number" id="mdisc" class="disc" value="15" step="1" min="0" max="100">
    <label for="dueSh">Due to (from) shareholder</label><input type="text" inputmode="decimal" id="dueSh" class="money" value="20,000">
    <label for="indPref">Individual preferred shares</label><input type="text" inputmode="decimal" id="indPref" class="money" value="30,000">
    <label for="othAdj">Other adjustments</label><input type="text" inputmode="decimal" id="othAdj" class="money" value="0">
  </div>
  <div class="compare">
    <div class="panel notional">
      <h4>Notional: capitalized cash flow</h4>
      <div class="row"><span class="l">Company value (100% of shares)</span><span id="iCo100"></span></div>
      <div class="row"><span class="l">Multiply by: individual ownership %</span><span id="iOwn"></span></div>
      <div class="row sum" style="font-weight:600"><span>Pro-Rata Value of Individual Interest</span><span id="iInt"></span></div>
      <div class="row"><span class="l" id="iDiscL">Less: reduction for minority discount</span><span id="iDisc"></span></div>
      <div class="row sum" style="font-weight:600"><span>Value of Individual Interest before Adjustments</span><span id="iBefore"></span></div>
      <div class="row"><span class="l">Due to (from) shareholder</span><span id="iDue"></span></div>
      <div class="row"><span class="l">Individual preferred shares</span><span id="iIP"></span></div>
      <div class="row"><span class="l">Other adjustments</span><span id="iOth"></span></div>
      <div class="row big sum"><span>Final Value of Individual Interest</span><span id="iFinal"></span></div>
    </div>
    <div class="panel market">
      <h4>Open market: likely buyer</h4>
      <div class="row"><span class="l">Company value (100% of shares)</span><span id="jCo100"></span></div>
      <div class="row"><span class="l">Multiply by: individual ownership %</span><span id="jOwn"></span></div>
      <div class="row sum" style="font-weight:600"><span>Pro-Rata Value of Individual Interest</span><span id="jInt"></span></div>
      <div class="row"><span class="l" id="jDiscL">Less: reduction for minority discount</span><span id="jDisc"></span></div>
      <div class="row sum" style="font-weight:600"><span>Value of Individual Interest before Adjustments</span><span id="jBefore"></span></div>
      <div class="row"><span class="l">Due to (from) shareholder</span><span id="jDue"></span></div>
      <div class="row"><span class="l">Individual preferred shares</span><span id="jIP"></span></div>
      <div class="row"><span class="l">Other adjustments</span><span id="jOth"></span></div>
      <div class="row big sum"><span>Final Value of Individual Interest</span><span id="jFinal"></span></div>
    </div>
  </div>
</div>

<p class="foot">This calculator is an educational illustration of how valuation inputs affect results. It is not a valuation opinion, calculation report or advice, and it should not be relied on for any transaction, tax, legal or financial decision. Hard asset values are taken as given; in practice they may require input from other qualified experts. International Valuation Standards (IVS) call for professional scepticism throughout a valuation and for reconciling, not averaging, results from different approaches.</p>

</div>
</div>
</template>

<script lang="ts">
// @ts-nocheck
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CcfCalculator',
  mounted() {
    var self = this, tracked = [];
    var docAdd = document.addEventListener, winAdd = window.addEventListener;
    document.addEventListener = function (t, f, o) { tracked.push([document, t, f, o]); return docAdd.call(document, t, f, o); };
    window.addEventListener = function (t, f, o) { tracked.push([window, t, f, o]); return winAdd.call(window, t, f, o); };
    try {
      (function () {
      
      /*CALC-START*/
      function r(x,d){var m=Math.pow(10,d||0);return Math.round(x*m)/m;}
      function rNeg2(x){return Math.round(x/100)*100;}
      function calc(p){
        // p: {opt, years:[{ni,itda,disc,one,other,sal,w}], ownerFmv, tax, tab, capex, shield, prime, dprem, rf, erp, size, ind, ctry, csr, debt, growth, mkt}  (percentages as decimals)
        var sde=p.years.map(function(y){return y.ni+y.itda+y.disc+y.one+y.other+y.sal;});
        var earn=sde.map(function(s){return p.opt===1?s:s-p.ownerFmv;});
        var W=p.years.reduce(function(a,y){return a+(y.w>0?y.w:0);},0);
        var weighted=0;
        var wv=[0,0,0,0,0];
        if(W>0){p.years.forEach(function(y,i){if(y.w>0){wv[i]=r(y.w/W*earn[i]);weighted+=wv[i];}});}
        var A=rNeg2(weighted);
        var taxAmt=r(A*-p.tax);
        var mcf=rNeg2(A+taxAmt-p.capex);
        var kdPre=p.prime+p.dprem;
        var kdTax=r(kdPre*-p.tax,4);
        var kd=kdPre+kdTax;
        var ke=r(p.rf+p.erp+p.size+p.ind+p.ctry+p.csr,4);
        var wkd=r(kd*p.debt,4),wke=r(ke*(1-p.debt),4),waccPre=wkd+wke;
        var wacc=r(waccPre-p.growth,4);
        var valid=wacc>0;
        var mult=valid?r(1/wacc,2):NaN;
        var cap=valid?r(mcf*mult):NaN;
        var ev=cap+p.shield;
        var gw=ev-p.tab;
        var pb=A!==0?r(gw/A,2):NaN;
        var base=p.opt===2?earn[0]:sde[0];
        var mev=base*p.mkt;
        var mgw=mev-p.tab;
        var mpb=base!==0?r(mgw/base,2):NaN;
        return {sde:sde,earn:earn,wv:wv,A:A,taxAmt:taxAmt,mcf:mcf,kdPre:kdPre,kdTax:kdTax,kd:kd,ke:ke,wkd:wkd,wke:wke,waccPre:waccPre,wacc:wacc,valid:valid,mult:mult,ev:ev,gw:gw,pb:pb,base:base,mev:mev,mgw:mgw,mpb:mpb};
      }
      /*CALC-END*/
      
      var rows=[
        {k:'rev',l:'Revenue',v:[900000,850000,720000,690000,680000],info:true},
        {k:'ni',l:'<b>Reported net income</b> <span class="hint">(starting point)</span>',v:[170000,153000,136000,102000,68000]},
        {k:'itda',l:'Add: interest, taxes, depreciation & amortization',v:[76000,67000,60000,48000,41000]},
        {k:'disc',l:'Add: discretionary, personal & non-business expenses',v:[30000,28000,22000,11000,6000]},
        {k:'one',l:'Add: one-time & non-recurring items',v:[11000,8000,7000,6000,4000]},
        {k:'other',l:'Add: other adjustments',v:[3000,3000,2000,1000,1000]},
        {k:'sal',l:'Add: salaries paid to owner & non-working family',v:[55000,50000,45000,40000,35000]}
      ];
      var weights=[5,4,3,2,1];
      var $=function(id){return document.getElementById(id);};
      var fmt=new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD',maximumFractionDigits:0});
      function money(x){if(!isFinite(x))return '—';return (x<0?'–':'')+fmt.format(Math.abs(x));}
      function pct(x){return isFinite(x)?(x*100).toFixed(2)+'%':'—';}
      function times(x){return isFinite(x)?x.toFixed(2)+'x':'—';}
      
      (function wrapPct(){
        ['tax','prime','dprem','rf','erp','size','ind','ctry','csr','debt','growth','own','mdisc'].forEach(function(id){
          var el=document.getElementById(id);
          if (el && el.parentNode && !el.parentNode.classList.contains('pct')) {
            var w=document.createElement('span');w.className='pct';el.parentNode.insertBefore(w,el);w.appendChild(el);
          }
        });
      })();
      (function build(){
        var tb=$('finBody'),html='';
        rows.forEach(function(row){
          html+='<tr'+(row.info?' class="muted"':'')+'><td>'+row.l+'</td>';
          row.v.forEach(function(v,i){html+='<td><input type="text" inputmode="decimal" class="money" data-k="'+row.k+'" data-i="'+i+'" value="'+num(v)+'"></td>';});
          html+='</tr>';
          if(row.info)html+='<tr class="spacer"><td colspan="6"></td></tr>';
        });
        html+='<tr class="total"><td id="sdeL">Seller\'s Discretionary Earnings (SDE)</td>'+[0,1,2,3,4].map(function(i){return '<td id="sde'+i+'"></td>';}).join('')+'</tr>';
        html+='<tr id="ownRow"><td>Less: fair market value of owner\'s compensation</td><td><input type="text" inputmode="decimal" id="ownerFmv" class="disc money neg-in" value="-100,000"></td>'+[1,2,3,4].map(function(i){return '<td id="own'+i+'"></td>';}).join('')+'</tr>';
        html+='<tr id="ebRow" class="total"><td>Normalized EBITDA</td>'+[0,1,2,3,4].map(function(i){return '<td id="eb'+i+'"></td>';}).join('')+'</tr>';
        html+='<tr class="muted"><td>SDE margin</td>'+[0,1,2,3,4].map(function(i){return '<td id="mg'+i+'"></td>';}).join('')+'</tr>';
        html+='<tr class="wrow"><td style="position:relative"><b>Weighting of each year</b> <button type="button" class="hjbtn" data-pop="hjPop" aria-expanded="false" aria-controls="hjPop" title="Guidance from Howard Johnson">HJ</button>'+
          '<div class="hjpop" id="hjPop" role="dialog" aria-label="Guidance from Howard Johnson" hidden>'+
          '<div class="hjhead">Guidance from Howard Johnson<button type="button" class="hjx" aria-label="Close">×</button></div>'+
          '<blockquote>“A lot of times I see valuations and they look at weighting a lot of the historical results – e.g., a factor of 3 for this year and a factor of 2 for that year…. Rarely is that done in the open market… The open market tends to be fixated… on how the trailing twelve months (TTM) did.”</blockquote>'+
          '<div class="hjsrc">– Howard Johnson, CBV Connect 2023 keynote</div>'+
          '<div class="hjint"><b>Interpretation:</b> It is suggested to input complete weighting on the TTM period and delete values for the 4 other periods. Proceed with caution.</div>'+
          '<button type="button" class="hjapply" id="hjApply">Apply TTM-only weighting</button>'+
          '</div></td>'+weights.map(function(w,i){return '<td><input type="number" class="disc" min="0" step="1" data-w="'+i+'" value="'+w+'"></td>';}).join('')+'</tr>';
        html+='<tr class="muted"><td id="wvL">Weighted amount</td>'+[0,1,2,3,4].map(function(i){return '<td id="wv'+i+'"></td>';}).join('')+'</tr>';
        html+='<tr class="concl"><td style="position:relative"><span id="conclL">Concluded weighted SDE</span> <button type="button" class="bulbbtn" data-pop="tipConcl" aria-expanded="false" aria-controls="tipConcl" aria-label="Guidance on the concluded weighted figure"><svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"/><path d="M10 21h4"/><path d="M12 3a6 6 0 0 0-3.6 10.8c.6.5 1 1.2 1.1 2V17h5v-1.2c.1-.8.5-1.5 1.1-2A6 6 0 0 0 12 3z"/></svg></button><div class="hjpop bulbpop" id="tipConcl" role="dialog" aria-label="Guidance" hidden><div class="hjhead">What should this figure represent?<button type="button" class="hjx" aria-label="Close">×</button></div><div class="ivsl" style="margin:0">This should reasonably reflect what the business&#39; normalized annual <span class="eblab">SDE</span> will be on a go-forward basis as at the Valuation Date, assuming no growth. In other words, this should reasonably reflect what the normalized <span class="eblab">SDE</span> will be equal to over the next 12 months starting as at the Valuation Date, assuming no growth.</div></div></td><td colspan="5" id="concl"></td></tr>';
        html+='<tr class="cmarg"><td id="cmargL">Weighted SDE margin % (on TTM revenue)</td><td colspan="5" id="cmarg"></td></tr>';
        tb.innerHTML=html;
        tb.querySelectorAll('input[data-k="rev"]').forEach(function(el){var w=document.createElement('span');w.className='dol';el.parentNode.insertBefore(w,el);w.appendChild(el);});
      })();
      
      function val(el){var n=parseFloat(String(el.value).replace(/[,\s$]/g,''));return isFinite(n)?n:0;}
      function num(x){return new Intl.NumberFormat('en-CA',{maximumFractionDigits:2}).format(x);}
      function read(){
        var opt=parseInt(document.querySelector('input[name=btype]:checked').value,10);
        var years=[0,1,2,3,4].map(function(i){
          var g=function(k){return val(document.querySelector('input[data-k="'+k+'"][data-i="'+i+'"]'));};
          return {rev:g('rev'),ni:g('ni'),itda:g('itda'),disc:g('disc'),one:g('one'),other:g('other'),sal:g('sal'),w:val(document.querySelector('input[data-w="'+i+'"]'))};
        });
        var P=function(id){return val($(id))/100;};
        return {opt:opt,years:years,ownerFmv:Math.abs(val($('ownerFmv'))),tax:P('tax'),tab:val($('tab')),capex:val($('capex')),shield:val($('shield')),
          prime:P('prime'),dprem:P('dprem'),rf:P('rf'),erp:P('erp'),size:P('size'),ind:P('ind'),ctry:P('ctry'),csr:P('csr'),debt:P('debt'),growth:Math.abs(P('growth')),mkt:val($('mkt')),redund:val($('redund')),debtAmt:Math.abs(val($('debtAmt'))),pref:Math.abs(val($('pref'))),othCo:val($('othCo')),own:Math.min(100,Math.max(0,val($('own'))))/100,mdisc:Math.min(100,Math.abs(val($('mdisc'))))/100,dueSh:val($('dueSh')),indPref:val($('indPref')),othAdj:val($('othAdj'))};
      }
      
      var lastOpt=1;
      function update(){
        var p=read(),c=calc(p),ebLabel=p.opt===1?'SDE':'EBITDA';
        document.querySelectorAll('.opt').forEach(function(o){o.classList.toggle('on',o.querySelector('input').checked);});
        if(p.opt!==lastOpt){
          var wasSde=lastOpt!==2,isSde=p.opt!==2;
          if(wasSde!==isSde)$('mkt').value=isSde?'2.9':'4.0';
          lastOpt=p.opt;p=read();c=calc(p);
        }
        $('ownRow').style.display=p.opt===1?'none':'';
        $('ebRow').style.display=p.opt===1?'none':'';
        var pk=p.opt!==1;$('eb0').innerHTML=pk?'<span class="pinkbox"></span>':'';
        for(var i=0;i<5;i++){
          if(i===0&&p.opt===1)$('sde0').innerHTML='<span class="pinkbox">'+money(c.sde[0])+'</span>';else $('sde'+i).textContent=money(c.sde[i]);
          if(i===0&&pk)$('eb0').firstChild.textContent=money(c.earn[0]);else $('eb'+i).textContent=money(c.earn[i]);
          if(i>0)$('own'+i).textContent=money(-p.ownerFmv);
          $('wv'+i).textContent=p.years[i].w>0?money(c.wv[i]):'—';
          $('mg'+i).textContent=p.years[i].rev?(c.sde[i]/p.years[i].rev*100).toFixed(1)+'%':'—';
        }
        var W=p.years.reduce(function(a,y){return a+(y.w>0?y.w:0);},0);
        $('wTtm').textContent=W>0?'TTM share of the weighting: '+Math.round(p.years[0].w/W*100)+'%.':'Enter at least one weight.';
        var P2=function(x){return isFinite(x)?(x*100).toFixed(2)+'%':'—';};
        $('kdPre').textContent=P2(c.kdPre);$('kdTaxL').textContent='Less: taxes at '+(p.tax*100).toFixed(2).replace(/\.?0+$/,'')+'%';
        $('kdTax').textContent=P2(c.kdTax);$('kdOut').textContent=P2(c.kd);$('keOut').textContent=P2(c.ke);
        $('wC').textContent=P2(c.kd);$('wE').textContent=P2(c.wkd);
        $('wF').textContent=P2(c.ke);$('wG').textContent=P2(1-p.debt);$('wH').textContent=P2(c.wke);
        $('wI').textContent=P2(c.waccPre);$('wK').textContent=P2(c.wacc);$('wL').textContent=times(c.mult);
        $('nEarnL').textContent='Weighted '+ebLabel;
        $('wvL').textContent='Weighted '+ebLabel+' by period';
        $('conclL').textContent='Concluded weighted '+ebLabel;
        document.querySelectorAll('.v8c .eblab').forEach(function(x){x.textContent=ebLabel;});
        var ttmE=c.earn[0],dv=ttmE?(c.A-ttmE)/ttmE:NaN;
        $('concl').innerHTML='<div class="conclflex"><span class="concldelta">'+(!isFinite(dv)?'':Math.abs(dv)<0.0005?'(equal to TTM normalized '+ebLabel+' of '+money(ttmE)+')':'('+(dv<0?'–':'+')+Math.abs(dv*100).toFixed(1)+'% '+(dv<0?'decrease':'increase')+' vs. TTM normalized '+ebLabel+' of '+money(ttmE)+')')+'</span><span>'+money(c.A)+'</span></div>';
        $('cmargL').textContent='Weighted '+ebLabel+' margin % (on TTM revenue)';
        $('cmarg').textContent=p.years[0].rev?money(c.A)+' ÷ '+money(p.years[0].rev)+' = '+(c.A/p.years[0].rev*100).toFixed(1)+'%':'—';
        $('nEarn').textContent=money(c.A);
        $('nTaxL').textContent='Less tax at '+(p.tax*100).toFixed(2).replace(/\.?0+$/,'')+'%';
        $('nTax').textContent=money(c.taxAmt);
        $('nCapex').textContent=money(-p.capex);
        $('nMcf').textContent=money(c.mcf);
        $('nMult').textContent=times(c.mult);
        $('nCap').textContent=money(c.ev-p.shield);$('nShield').textContent=money(p.shield);
        $('nEv').textContent=money(c.ev);$('nTab').textContent=money(-p.tab);
        $('nGw').textContent=money(c.gw);$('nGw').className=c.gw<0?'neg':'';
        $('nDivL').textContent='Divided by weighted '+ebLabel;$('nDiv').textContent=money(c.A);
        $('nPb').textContent=times(c.pb);
        var bl=p.opt===2?'TTM EBITDA':'TTM SDE';
        $('mBaseL').textContent=bl;$('mktLabel').textContent='Market multiple of '+bl+' (x)';
        $('mBase').innerHTML=true?'<span class="pinkbox">'+money(c.base)+'</span>':money(c.base);
        $('mMult').textContent=times(p.mkt);
        $('mEv').textContent=money(c.mev);
        $('mTab').textContent=money(-p.tab);
        $('mGw').textContent=money(c.mgw);$('mGw').className=c.mgw<0?'neg':'';
        $('mDivL').textContent='Divided by '+bl;$('mDiv').textContent=money(c.base);
        $('mPb').textContent=times(c.mpb);
      
        var negMcf=c.mcf<0;
        $('nRest').style.display=negMcf?'none':'';$('nNeg').style.display=negMcf?'':'none';
        $('nNegTab').textContent=money(p.tab);$('nNegVal').textContent=money(p.tab);$('nNegTab2').textContent=money(p.tab);
        var negGw=!negMcf&&c.valid&&c.gw<0;
        $('nPbBlock').style.display=negGw?'none':'';$('nNeg2').style.display=negGw?'':'none';
        $('nNeg2Tab').textContent=money(p.tab);$('nNeg2Val').textContent=money(p.tab);$('nNeg2Tab2').textContent=money(p.tab);
        var nG=(negMcf||negGw)?0:c.gw;
        var lp=$('livePb'),txt=nG>0?'Goodwill Payback (Years) = '+times(c.pb):'Goodwill = $0';
        if(lp.textContent&&lp.textContent!==txt){lp.classList.add('flash');clearTimeout(lp._t);lp._t=setTimeout(function(){lp.classList.remove('flash');},350);}
        lp.textContent=txt;lp.classList.toggle('zero',!(nG>0));
        var mx=Math.max(Math.abs(nG)||0,Math.abs(c.mgw)||0,1);
        var kG=Math.max(0,isFinite(c.mgw)?c.mgw:0),adj=p.redund-p.debtAmt-p.pref+p.othCo;
        [['c',nG],['k',kG]].forEach(function(z){var ev=p.tab+z[1];
          $(z[0]+'Tab').textContent=money(p.tab);$(z[0]+'Gw').textContent=money(z[1]);$(z[0]+'Ev').textContent=money(ev);
          $(z[0]+'Red').textContent=money(p.redund);$(z[0]+'Debt').textContent=money(-p.debtAmt);$(z[0]+'Pref').textContent=money(-p.pref);$(z[0]+'OthCo').textContent=money(p.othCo);
          $(z[0]+'Co').textContent=money(ev+adj);
          var ip=z[0]==='c'?'i':'j',co=ev+adj;
          $(ip+'Co100').textContent=money(co);$(ip+'Own').textContent=(p.own*100).toFixed(2).replace(/\.?0+$/,'')+'%';var pr=Math.round(co*p.own),dsc=Math.round(pr*p.mdisc);$(ip+'Int').textContent=money(pr);
          $(ip+'DiscL').textContent='Less: reduction for minority discount ('+(p.mdisc*100).toFixed(2).replace(/\.?0+$/,'')+'%)';$(ip+'Disc').textContent=money(-dsc);$(ip+'Before').textContent=money(pr-dsc);
          $(ip+'Due').textContent=money(p.dueSh);$(ip+'IP').textContent=money(p.indPref);$(ip+'Oth').textContent=money(p.othAdj);$(ip+'Final').textContent=money(pr-dsc+p.dueSh+p.indPref+p.othAdj);});
        var cd=(p.tab+kG)-(p.tab+nG);
        $('coGap').innerHTML='Difference in company value: <b>'+money(Math.abs(cd))+'</b> '+(cd>=0?'higher on the open-market basis.':'higher on the notional basis.');
        [['bN',nG,'bNv'],['bM',c.mgw,'bMv']].forEach(function(b){
          var w=isFinite(b[1])?Math.abs(b[1])/mx*100:0;
          $(b[0]).style.left='0';$(b[0]).style.width=w+'%';
          $(b[0]).style.opacity=b[1]<0?.45:1;
          $(b[2]).textContent=money(b[1]);
        });
        var g=$('gap');
        if(isFinite(nG)&&isFinite(c.mgw)){
          var d=c.mgw-nG;
          g.innerHTML='Difference between the two: <b>'+money(Math.abs(d))+'</b> '+(d>=0?'more goodwill on the open-market basis.':'more goodwill on the notional basis.');
        } else g.textContent='';
      
        var m=[];
        if(!c.valid)m.push(['','The cost of capital after growth is zero or negative, so a capitalization multiple cannot be calculated. Check the rates entered.']);
        else{
      
          if(p.opt===3)m.push(['','This basis deducts a market salary for the owner. A likely owner-operator buyer would do the work themselves and would not make that deduction.']);
          if(p.years[0].w>0&&W>p.years[0].w&&c.earn[0]>c.A)m.push(['','Weighting older, lower years pulls the earnings base '+money(c.earn[0]-c.A)+' below the latest twelve months.']);
          if(c.valid&&nG>0&&isFinite(c.mgw)&&c.mgw>0&&Math.abs(nG-c.mgw)/c.mgw<=0.15)m.push(['ok','The notional and open-market results are within 15% of each other, so they corroborate one another.']);
        }
        $('msg').innerHTML=m.map(function(x){return '<div class="note '+x[0]+'">'+x[1]+'</div>';}).join('');
        heat(p,c);
        comps(p,c,nG);
        if(typeof drawLink==='function')drawLink();
      }
      
      function heat(p,c){
        var debts=[0,.1,.2,.3,.4,.5],csrs=[.05,.10,.15,.20,.25,.30,.35,.40];
        var h='<tr><th>CSR \\ Debt</th>'+debts.map(function(d){return '<th>'+Math.round(d*100)+'%</th>';}).join('')+'</tr>';
        var lo=Infinity,hi=-Infinity;
        csrs.forEach(function(s){
          h+='<tr><th>'+Math.round(s*100)+'%</th>';
          debts.forEach(function(d){
            var q=Object.assign({},p,{csr:s,debt:d}),x=calc(q);
            var v=x.valid?Math.max(0,x.gw):NaN,bg='#eee';
            if(isFinite(v)){lo=Math.min(lo,v);hi=Math.max(hi,v);
              if(v<=0)bg='#e9b7a8';
              else if(c.mgw>0&&Math.abs(v-c.mgw)/c.mgw<=0.15)bg='#bfe1d6';
              else if(v<c.mgw)bg='#cfe0ee';
              else bg='#f3dfa8';}
            var cur=Math.abs(s-p.csr)<1e-9&&Math.abs(d-p.debt)<1e-9;
            h+='<td class="'+(cur?'cur':'')+'" style="background:'+bg+'" title="Multiple '+times(x.mult)+'">'+(isFinite(v)?short(v):'n/a')+'</td>';
          });
          h+='</tr>';
        });
        $('heat').innerHTML=h;
        $('spread').innerHTML=isFinite(lo)?'Across this grid, notional goodwill ranges from <b>'+money(lo)+'</b> to <b>'+money(hi)+'</b>, while the open-market estimate is <b>'+money(c.mgw)+'</b>. The financial results are identical in every cell.':'';
      }
      
      var COMPS={
        1:[[392000,780000,187000,252000],[1695000,1120000,470000,1385000],[451000,650000,198000,356000],[1602000,960000,432000,1382000],[1100000,1250000,350000,840000]],
        2:[[419000,1050000,126000,239000],[1790000,1600000,400000,1440000],[475000,820000,148000,355000],[1127000,1300000,286000,887000],[1266000,2100000,315000,866000]]
      };
      var compSet=0;
      function median(a){var b=a.slice().sort(function(x,y){return x-y;}),m=Math.floor(b.length/2);return b.length%2?b[m]:(b[m-1]+b[m])/2;}
      function comps(p,c,nG){
        var card=$('compCard');
        if(p.opt===3){card.style.display='none';return;}
        card.style.display='';
        var L=p.opt===1?'SDE':'EBITDA',d=COMPS[p.opt];
        if(compSet!==p.opt){
          compSet=p.opt;
          d.sort(function(a,b){return (a[2]?a[3]/a[2]:Infinity)-(b[2]?b[3]/b[2]:Infinity);});
          var h='<thead><tr><th>Comp #</th><th>Enterprise Value (EV)</th><th>Sales</th><th>'+L+'</th><th>Goodwill Value</th><th>'+L+' Margin %</th><th>Goodwill Payback</th></tr></thead><tbody>';
          d.forEach(function(r,i){
            h+='<tr><td>'+(i+1)+'</td>'+r.map(function(v,j){return '<td><input type="text" inputmode="decimal" class="money" data-c="'+i+'" data-j="'+j+'" value="'+num(v)+'"></td>';}).join('')+'<td id="cm'+i+'"></td><td id="cp'+i+'"></td></tr>';
          });
          [['Minimum','min'],['Maximum','max'],['Median','med']].forEach(function(st,k){h+='<tr class="stat'+(k===0?' first':'')+'"><td>'+st[0]+'</td>'+[0,1,2,3,4,5].map(function(j){return '<td id="st_'+st[1]+'_'+j+'"></td>';}).join('')+'</tr>';});
          h+='<tr class="subjn"><td>Subject (notional)</td><td id="nsEv"></td><td id="nsSales"></td><td id="nsE"></td><td id="nsGw"></td><td id="nsM"></td><td id="nsP"></td></tr>';
          h+='<tr class="rankn"><td style="position:relative">Subject (notional) rank of 6 <button type="button" class="hjbtn ivsbtn2 ivssm" data-pop="ivsPopRank" aria-expanded="false" aria-controls="ivsPopRank" title="Guidance from International Valuation Standards">IVS</button><div class="hjpop ivspop rankpop" id="ivsPopRank" role="dialog" aria-label="Guidance from International Valuation Standards" hidden><div class="hjhead">Guidance from International Valuation Standards<button type="button" class="hjx" aria-label="Close">×</button></div><p class="ivsl"><b>As per IVS 103, para. A10.10,</b> the valuator should analyze and adjust for any significant differences between the comparable transactions and the subject business. Common examples include adjusting for size (i.e. revenues), profitability (i.e. margin %) and growth.</p><div class="hjsrc" style="margin-left:0">Source: International Valuation Standards (effective 31 January 2028), Exposure Draft</div><div class="hjint"><b>Interpretation:</b> Buyers pay larger multiples for larger and more profitable businesses. Accordingly, the valuator should justify their goodwill payback period conclusion in light of how the business&#39; revenues and profit margin are relative to comparables.</div></div></td><td></td><td id="nrS"></td><td></td><td></td><td id="nrM"></td><td id="nrP"></td></tr>';
          h+='<tr class="subj"><td>Subject (open market)</td><td id="sEv"></td><td id="sSales"></td><td id="sE"></td><td id="sGw"></td><td id="sM"></td><td id="sP"></td></tr>';
          h+='<tr class="rank"><td>Subject (open market) rank of 6</td><td></td><td id="rS"></td><td></td><td></td><td id="rM"></td><td id="rP"></td></tr></tbody>';
          $('comps').innerHTML=h;
        }
        document.querySelectorAll('#comps input[data-c]').forEach(function(el){d[+el.dataset.c][+el.dataset.j]=val(el);});
        var ms=[],ps=[];
        d.forEach(function(r,i){var m=r[1]?r[2]/r[1]:NaN,pb=r[2]?r[3]/r[2]:NaN;ms.push(m);ps.push(pb);
          $('cm'+i).textContent=isFinite(m)?(m*100).toFixed(1)+'%':'—';$('cp'+i).textContent=times(pb);});
        var fm=ms.filter(isFinite),fp=ps.filter(isFinite);
        var cols=[0,1,2,3].map(function(j){return d.map(function(r){return r[j];});}).concat([fm,fp]);
        var fmts=[money,money,money,money,function(x){return (x*100).toFixed(1)+'%';},times];
        var fn={min:function(a){return Math.min.apply(null,a);},max:function(a){return Math.max.apply(null,a);},med:median};
        ['min','max','med'].forEach(function(k){cols.forEach(function(a,j){$('st_'+k+'_'+j).textContent=a.length?fmts[j](fn[k](a)):'—';});});
        var sales=p.years[0].rev,base=c.base;
        var W=p.years.reduce(function(a,y){return a+(y.w>0?y.w:0);},0),wRev=0;
        if(W>0)p.years.forEach(function(y){if(y.w>0)wRev+=y.w/W*y.rev;});
        var nEv=p.tab+nG,nPb=c.A?nG/c.A:NaN;
        $('nsEv').textContent=money(nEv);$('nsSales').textContent=money(sales);$('nsE').textContent=money(c.A);$('nsGw').textContent=money(nG);
        $('nsM').textContent=sales?(c.A/sales*100).toFixed(1)+'%':'—';$('nsP').textContent=times(nPb);
        $('sEv').textContent=money(c.mev);$('sSales').textContent=money(sales);$('sE').textContent=money(base);$('sGw').textContent=money(c.mgw);
        $('sM').textContent=sales?(base/sales*100).toFixed(1)+'%':'—';$('sP').textContent=times(c.mpb);
        var rank=function(v,arr){var a=arr.filter(isFinite);if(!isFinite(v))return '—';var n=1+a.filter(function(x){return x>v;}).length;return n+' of '+(a.length+1);};
        var sMg=sales?base/sales:NaN;
        $('rS').textContent=rank(sales,d.map(function(r){return r[1];}));
        $('nrS').textContent=rank(sales,d.map(function(r){return r[1];}));
        $('nrM').textContent=rank(sales?c.A/sales:NaN,ms);
        $('nrP').textContent=rank(nPb,ps);
        var rn=function(v,arr){var a=arr.filter(isFinite);return isFinite(v)?1+a.filter(function(x){return x>v;}).length:NaN;};
        var ord=function(n){return n+(n===1?'st':n===2?'nd':n===3?'rd':'th');};
        var rS=rn(sales,d.map(function(r){return r[1];})),rM=rn(sales?c.A/sales:NaN,ms),rP=rn(nPb,ps),bn='';
        if(isFinite(rS)&&isFinite(rM)&&isFinite(rP)){
          if(rP>rS&&rP>rM)bn='<div class="bias under"><b>Potential Notional Under Valuation Bias</b><br>The notional goodwill payback ranks '+ord(rP)+' of 6, lower than both its revenue ranking ('+ord(rS)+') and its margin ranking ('+ord(rM)+'). At least one comparable with lower revenue, and at least one with a lower margin, sold for a longer goodwill payback.<div class="tip"><b>Suggestion:</b> decrease the Company Specific Risk and/or increase the debt portion of capital to increase the goodwill payback period.</div></div>';
          else if(rP<rS&&rP<rM)bn='<div class="bias over"><b>Potential Notional Over Valuation Bias</b><br>The notional goodwill payback ranks '+ord(rP)+' of 6, higher than both its revenue ranking ('+ord(rS)+') and its margin ranking ('+ord(rM)+'). At least one comparable with higher revenue, and at least one with a higher margin, sold for a shorter goodwill payback.<div class="tip"><b>Suggestion:</b> increase the Company Specific Risk and/or decrease the debt portion of capital to decrease the goodwill payback period.</div></div>';
        }
        $('biasNote').innerHTML=bn;
        $('rM').textContent=rank(sMg,ms);
        $('rP').textContent=rank(c.mpb,ps);
        if(fp.length&&isFinite(c.mpb)){
          var lo=Math.min.apply(null,fp),hi=Math.max.apply(null,fp),inR=c.mpb>=lo&&c.mpb<=hi;
          var nIn=isFinite(nPb)&&nPb>=lo&&nPb<=hi;
          $('compNote').innerHTML='Comparable goodwill paybacks range from '+times(lo)+' to '+times(hi)+' (median '+times(median(fp))+'). The subject\'s open-market payback of <b>'+times(c.mpb)+'</b> '+(inR?'falls within':'falls outside')+' that range; the notional payback of <b>'+times(nPb)+'</b> '+(nIn?'falls within':'falls outside')+' it.';
        } else $('compNote').textContent='';
      }
      function short(v){return money(v);}
      
      
      (function(){
        function closeAll(){document.querySelectorAll('.v8c .hjpop').forEach(function(p){p.hidden=true;});document.querySelectorAll('.v8c .hjbtn[data-pop],.v8c .dgbtn[data-pop],.v8c .bulbbtn[data-pop]').forEach(function(b){b.setAttribute('aria-expanded','false');});}
        document.querySelector('.v8c').addEventListener('click',function(e){
          var b=e.target.closest('.hjbtn[data-pop],.dgbtn[data-pop],.bulbbtn[data-pop]');
          if(b){e.preventDefault();e.stopPropagation();var pop=$(b.dataset.pop),open=pop.hidden;closeAll();pop.hidden=!open;b.setAttribute('aria-expanded',open?'true':'false');return;}
          if(e.target.closest('label .hjpop'))e.preventDefault();
          if(e.target.closest('.hjx')){closeAll();return;}
          if(e.target.id==='hjApply'){document.querySelectorAll('input[data-w]').forEach(function(el){el.value=el.dataset.w==='0'?'1':'0';});update();closeAll();return;}
          if(!e.target.closest('.hjpop'))closeAll();
        });
        document.addEventListener('click',function(e){if(!e.target.closest('.v8c'))closeAll();});
        document.addEventListener('keydown',function(e){if(e.key==='Escape')closeAll();});
      })();
      
      function drawLink(){
        var card=$('cocCard'),svg=$('dgSvg'),wrap=$('dgWrap');if(!card || !svg || !wrap)return;
        var elA=$('csr'),elB=$('debt'),elM=$('keOut');if(!elA || !elB || !elM)return;
        var cr=card.getBoundingClientRect(),a=elA.getBoundingClientRect(),b=elB.getBoundingClientRect(),m=elM.getBoundingClientRect();
        var x=Math.min(a.left,b.left)-cr.left-16,ya=a.top-cr.top+a.height/2,yb=b.top-cr.top+b.height/2,ym=m.top-cr.top+m.height/2;
        var ax=a.left-cr.left-3,bx=b.left-cr.left-3,col='#d9822b';
        function arrow(tx,ty){return '<path d="M'+(tx-7)+' '+(ty-5)+' L'+tx+' '+ty+' L'+(tx-7)+' '+(ty+5)+'" fill="none" stroke="'+col+'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>';}
        svg.innerHTML='<path d="M'+ax+' '+ya+' H'+x+' V'+yb+' H'+bx+'" fill="none" stroke="'+col+'" stroke-width="2" stroke-dasharray="5 4"/>'+arrow(ax,ya)+arrow(bx,yb)+'<circle cx="'+x+'" cy="'+ym+'" r="4" fill="'+col+'"/>';
        wrap.style.left='0px';wrap.style.top='0px';
        var w=wrap.querySelector('.dgbtn').getBoundingClientRect();
        wrap.style.left=Math.max(4,x-w.width-8)+'px';wrap.style.top=(ym-w.height/2)+'px';
      }
      window.addEventListener('resize',drawLink);
      if(window.ResizeObserver)new ResizeObserver(drawLink).observe(document.querySelector('.v8c'));
      document.querySelector('.v8c').addEventListener('input',update);
      document.querySelector('.v8c').addEventListener('focusout',function(e){var t=e.target;if(t.id==='growth'&&t.value.trim()!==''){var g=-Math.abs(val(t));t.value=g===0?'0':String(g);update();return;}if(t.classList&&t.classList.contains('money')&&t.value.trim()!==''){var n=val(t);if(t.classList.contains('neg-in'))n=-Math.abs(n);t.value=num(n);update();}});
      document.querySelector('.v8c').addEventListener('change',update);
      update();
      drawLink();
      
      })();
    } finally {
      document.addEventListener = docAdd;
      window.addEventListener = winAdd;
    }
    (this as any)._v8tracked = tracked;
  },
  beforeUnmount() { (this as any)._v8cleanup(); },
  beforeDestroy() { (this as any)._v8cleanup(); },
  methods: {
    _v8cleanup() {
      ((this as any)._v8tracked || []).forEach(function (l: any) { l[0].removeEventListener(l[1], l[2], l[3]); });
      (this as any)._v8tracked = [];
    }
  }
})
</script>

<style>
.v8c{--ink:#16202c;--muted:#5b6776;--line:#dfe4ea;--bg:#f6f8fa;--card:#fff;--accent:#1f4e79;--accent2:#2f7d6d;--warn:#b4472f;--input:#fff8db;--inputline:#e6d38a;
  font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;color:var(--ink);background:var(--bg);line-height:1.45;font-size:15px;padding:24px 16px 48px}
.v8c *{box-sizing:border-box}
.v8c .wrap{max-width:1180px;margin:0 auto}
.v8c h1{font-size:28px;line-height:1.2;margin:0 0 8px;letter-spacing:-.01em}
.v8c h2{font-size:17px;margin:0 0 12px}
.v8c h3{font-size:13px;text-transform:uppercase;letter-spacing:.06em;color:var(--muted);margin:18px 0 8px}
.v8c p{margin:0 0 10px}
.v8c .lede{color:var(--muted);max-width:820px;margin-bottom:22px}
.v8c .grid{display:grid;grid-template-columns:minmax(0,1.45fr) minmax(0,1fr);gap:20px;align-items:start}
@media (max-width:1000px){.v8c .grid{grid-template-columns:1fr}}
.v8c .card{background:var(--card);border:1px solid var(--line);border-radius:10px;padding:18px 18px 16px;margin-bottom:20px}
.v8c .step{display:flex;gap:10px;align-items:baseline}
.v8c .num{flex:none;width:24px;height:24px;border-radius:50%;background:var(--accent);color:#fff;font-size:13px;font-weight:600;display:inline-flex;align-items:center;justify-content:center}
.v8c .hint{font-size:13px;color:var(--muted)}
.v8c label{font-size:13px;color:var(--ink)}
.v8c input[type=number],.v8c input[type=text],.v8c select{width:100%;font:inherit;font-size:14px;padding:6px 8px;border:1px solid var(--line);border-radius:6px;background:#fff;color:var(--ink);text-align:right}
.v8c select{text-align:left}
.v8c .pct{position:relative;display:block}
.v8c .dol{position:relative;display:block}
.v8c .dol input{padding-left:18px}
.v8c .dol::before{content:'$';position:absolute;left:8px;top:50%;transform:translateY(-50%);font-size:13px;color:var(--muted);pointer-events:none}
.v8c .pct input{padding-right:22px;-moz-appearance:textfield;appearance:textfield}
.v8c .pct input::-webkit-outer-spin-button,.v8c .pct input::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}
.v8c .pct::after{content:'%';position:absolute;right:9px;top:50%;transform:translateY(-50%);font-size:14px;color:var(--muted);pointer-events:none}
.v8c input.disc{background:var(--input);border-color:var(--inputline)}
.v8c .opts{display:grid;gap:8px}
.v8c .opt{display:flex;gap:10px;align-items:flex-start;border:1px solid var(--line);border-radius:8px;padding:10px 12px;cursor:pointer}
.v8c .opt input{margin-top:3px}
.v8c .opt.on{border-color:var(--accent);background:#f1f6fb}
.v8c .opt b{display:block;font-size:14px}
.v8c .opt span{font-size:13px;color:var(--muted)}
.v8c .kv{display:grid;grid-template-columns:1fr 130px;gap:8px 12px;align-items:center}
.v8c table{width:100%;border-collapse:collapse;font-size:13px}
.v8c th,.v8c td{padding:5px 4px;border-bottom:1px solid var(--line);text-align:right;white-space:nowrap}
.v8c th:first-child,.v8c td:first-child{text-align:left;white-space:normal}
.v8c thead th{font-weight:600;color:var(--muted);font-size:12px}
.v8c .fin input{min-width:74px;padding:5px 6px;font-size:13px}
.v8c .fin th,.v8c .fin td{padding-left:3px;padding-right:3px}
.v8c .fin td:first-child{min-width:120px}
.v8c .fin .dol input{padding-left:16px}
.v8c tr.total td{font-weight:600;border-top:2px solid var(--ink)}
.v8c .hjbtn{display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;border-radius:50%;border:none;background:var(--accent);color:#fff;font:700 10px/1 inherit;letter-spacing:.02em;cursor:pointer;vertical-align:middle;margin-left:4px}
.v8c .hjbadge{cursor:default;width:22px;height:22px;font-size:9px;margin:0 2px;vertical-align:-1px}
.v8c .dsbadge{width:auto;padding:0 8px;border-radius:11px;background:#5b3fa6}
.v8c .ivsbadge{width:auto;padding:0 7px;border-radius:11px;background:var(--accent2)}
.v8c .hjbtn:hover,.v8c .hjbtn[aria-expanded=true]{background:var(--accent2)}
.v8c .hjpop{position:absolute;left:0;bottom:calc(100% + 6px);z-index:20;width:min(460px,86vw);background:#fff;border:1px solid var(--line);border-top:4px solid var(--accent);border-radius:10px;box-shadow:0 10px 30px rgba(22,32,44,.18);padding:14px 16px;font-weight:400;white-space:normal;text-align:left}
.v8c .ivsbtn{position:absolute;left:-38px;bottom:-12px;z-index:5;width:auto;height:22px;padding:0 7px;border-radius:11px;font-size:9px;background:var(--accent2);box-shadow:0 0 0 3px #fff}
.v8c .ivsbtn:hover,.v8c .ivsbtn[aria-expanded=true]{background:var(--accent)}
.v8c .ivspop{left:auto;right:-140px;border-top-color:var(--accent2);text-align:left}
.v8c .ivsl{font-size:13px;margin:0 0 8px;color:var(--ink);font-weight:400}
.v8c table.wacc .ivspop *{font-weight:inherit}
.v8c table.wacc .ivspop b{font-weight:700}
.v8c table.wacc .ivspop .hjhead{font-weight:700;font-size:14px}
.v8c .gwpop{display:block;font-size:13px;font-weight:400;top:calc(100% + 6px);bottom:auto;width:min(440px,86vw)}
.v8c .gwpop[hidden]{display:none}
.v8c .row .gwpop,.v8c .row .gwpop *{white-space:normal!important;text-align:left!important;min-width:0!important}
.v8c .row.sum .gwpop span{border-top:0!important}
.v8c .row.sum .gwpop{border-top:4px solid var(--accent)!important;padding-top:14px!important}
.v8c .row.sum .gwpop .hjint{padding-top:8px}
.v8c .gwpop.gl{left:0}
.v8c .gwpop.gr{left:auto;right:-200px}
.v8c .gwpop .hjhead{display:flex}
.v8c .gwpop blockquote,.v8c .gwpop .hjsrc,.v8c .gwpop .hjint{display:block}
.v8c .row .lblwrap .hjbtn{font-size:10px;width:24px;height:24px}
.v8c .ivsbig{width:auto;height:30px;padding:0 14px;border-radius:15px;font-size:12px;background:var(--accent2);margin-left:10px;align-self:center}
.v8c .hjbig{width:30px;height:30px;font-size:11px;margin-left:8px;align-self:center}
.v8c .hjpop.coc{left:0;right:auto}
.v8c .ivspop.coc{left:0;right:auto;font-size:14px}
.v8c .dgLink{position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;overflow:visible;z-index:2}
.v8c .dgWrap{position:absolute;z-index:6}
.v8c .dgbtn{font:700 12px/1 inherit;padding:8px 12px;border-radius:16px;border:none;background:#d9822b;color:#fff;cursor:pointer;white-space:nowrap;box-shadow:0 2px 6px rgba(217,130,43,.35)}
.v8c .dgbtn:hover,.v8c .dgbtn[aria-expanded=true]{background:#b9691b}
.v8c .dgpop{top:calc(100% + 8px);bottom:auto;left:0;border-top-color:#d9822b;width:min(420px,80vw)}
.v8c .dsbtn{width:auto;height:26px;padding:0 10px;border-radius:13px;font-size:11px;background:#5b3fa6}
.v8c .dsbtn:hover,.v8c .dsbtn[aria-expanded=true]{background:#46308a}
.v8c .opt{position:relative}
.v8c .optpop{display:block;font-size:13px;top:calc(100% + 6px);color:var(--ink)}
.v8c .optpop[hidden]{display:none}
.v8c .optpop .hjhead{display:flex;color:var(--ink);font-weight:700}
.v8c .opt .optpop b{display:inline;font-size:inherit}
.v8c .opt b .dsbtn{margin-left:6px;height:22px;font-size:10px;vertical-align:1px}
.v8c .dspop{border-top-color:#5b3fa6;left:0}
.v8c .bankbtn{width:auto;height:24px;padding:0 10px;border-radius:12px;font-size:10.5px;background:#34495e;white-space:nowrap}
.v8c .bankbtn:hover,.v8c .bankbtn[aria-expanded=true]{background:#22313f}
.v8c .bankpop{border-top-color:#34495e;left:0}
.v8c .ivsbtn2{width:auto;height:26px;padding:0 10px;border-radius:13px;font-size:11px;background:var(--accent2)}
.v8c .ivsbtn2:hover,.v8c .ivsbtn2[aria-expanded=true]{background:var(--accent)}
.v8c .compivs{left:0;right:auto;width:min(520px,90vw)}
.v8c .ivsol{margin:0 0 10px;padding-left:20px;font-size:13px}
.v8c .ivsol li{margin:2px 0}
.v8c .ivssm{height:20px;font-size:9px;padding:0 7px;margin-left:4px;vertical-align:1px}
.v8c .rankpop{left:0;right:auto;font-weight:400;color:var(--ink);width:min(460px,86vw);white-space:normal}
.v8c table.comps .rankpop *{font-weight:inherit;text-align:left}
.v8c table.comps .rankpop b,.v8c table.comps .rankpop .hjhead{font-weight:700}
.v8c .livepb{grid-column:1/-1;margin:16px 0 4px}
.v8c .livepb-in{display:inline-block;font-weight:700;font-size:15px;padding:8px 14px;border-radius:8px;background:#f1f6fb;border:1.5px solid var(--accent);color:var(--accent);transition:background .25s}
.v8c .livepb-in.zero{background:#fdf3ef;border-color:#e3a593;color:#7a2f1d}
.v8c .livepb-in.flash{background:#fff3c4}
.v8c .caution{background:#fff6e8;border:1px solid #f0c98a;border-left:5px solid #d9822b;border-radius:10px;padding:14px 18px;margin-bottom:20px;color:#5a3a0e}
.v8c .caution-h{font-weight:700;font-size:15px;display:flex;align-items:center;gap:8px;margin-bottom:6px;color:#7a4a0c}
.v8c .caution-h i{font-style:normal;display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:50%;background:#d9822b;color:#fff;font-size:13px;font-weight:700}
.v8c .caution p{margin:0;font-size:14px}
.v8c .bulbbtn{display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:50%;border:1.5px solid #f0c98a;background:#fff6e8;color:#b9691b;cursor:pointer;padding:0;vertical-align:-5px;margin-left:4px}
.v8c .bulbbtn:hover,.v8c .bulbbtn[aria-expanded=true]{background:#d9822b;border-color:#d9822b;color:#fff}
.v8c .bulbpop{left:0;border-top-color:#d9822b;font-weight:400;font-size:13.5px;white-space:normal;width:min(420px,80vw)}
.v8c tr.concl .bulbpop *{font-size:13.5px;font-weight:400;color:var(--ink)}
.v8c tr.concl .bulbpop .hjhead{font-weight:700;font-size:14px}
.v8c .lblwrap{position:relative}
.v8c .hjpop.down{bottom:auto;top:calc(100% + 6px)}
.v8c .hjhead{font-weight:700;font-size:14px;display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}
.v8c .hjx{border:none;background:none;font-size:20px;line-height:1;cursor:pointer;color:var(--muted)}
.v8c .hjpop blockquote{margin:0;padding:0 0 0 12px;border-left:3px solid var(--accent2);font-style:italic;font-size:13.5px;color:var(--ink)}
.v8c .hjsrc{font-size:12px;color:var(--muted);margin:6px 0 10px 15px}
.v8c .hjint{font-size:13px;background:var(--bg);border-radius:6px;padding:8px 10px}
.v8c .hjapply{margin-top:10px;font:600 13px inherit;padding:7px 12px;border-radius:6px;border:1px solid var(--accent);background:#fff;color:var(--accent);cursor:pointer}
.v8c .hjapply:hover{background:#f1f6fb}
.v8c #ownerFmv,.v8c #debtAmt,.v8c #pref{color:var(--warn)}
.v8c table.comps th,.v8c table.comps td{text-align:right;padding:6px 6px}
.v8c table.comps th:first-child,.v8c table.comps td:first-child{text-align:left}
.v8c table.comps input{max-width:130px;margin-left:auto;display:block}
.v8c table.comps tr.stat td{color:var(--muted);font-weight:600}
.v8c table.comps tr.stat.first td{border-top:2px solid var(--ink)}
.v8c table.comps tr.subj td{background:#fde4ec;font-weight:700}
.v8c table.comps tr.rankn td{background:#f4f8fc;font-weight:700;color:var(--accent)}
.v8c .bias{font-size:14px;border-radius:8px;padding:12px 14px;margin-top:10px;border:1px solid}
.v8c .bias .tip{margin-top:8px;padding-top:8px;border-top:1px dashed currentColor}
.v8c .bias.under{background:#fff4e5;border-color:#f3c98b;color:#7a4a0c}
.v8c .bias.over{background:#f3eefc;border-color:#c9b6ef;color:#4a2d82}
.v8c table.comps tr.subjn td{background:#eaf1f8;font-weight:700;border-top:2px solid var(--ink)}
.v8c table.comps tr.rank td{background:#fef1f5;font-weight:700;color:#9c2f55}
.v8c .pinkbox{background:#fde4ec;border:1.5px solid #f2a7bf;border-radius:5px;padding:2px 6px}
.v8c .negc{font-size:13px;background:#fdf3ef;border:1px solid #f0cfc4;color:#7a2f1d;border-radius:6px;padding:8px 10px;margin:10px 0 6px}
.v8c input#mkt{background:#e6f5ec;border-color:#9fd3b4}
.v8c .cl{font-size:13px;color:var(--muted)}
.v8c .cv{font-size:14px;text-align:right;padding-right:8px}
.v8c .cl.tot,.v8c .cv.tot{color:var(--ink);font-weight:700;border-top:1px solid var(--ink);padding-top:6px}
.v8c table.wacc td{font-size:13px;padding:6px 4px}
.v8c table.wacc td.inp{width:120px}
.v8c table.wacc td.inp .pct{width:110px;margin-left:auto}
.v8c table.wacc td.lt{color:var(--muted);font-size:12px;text-align:center}
.v8c table.wacc tr.sub td{font-weight:600}
.v8c table.wacc tr.tot td{font-weight:700;font-size:14px;border-top:2px solid var(--ink)}
.v8c table.wacc tr.tot:last-child td{color:var(--accent)}
.v8c tr.concl td{font-weight:700;font-size:15px;background:#f1f6fb;border-top:2px solid var(--accent);border-bottom:2px solid var(--accent);padding:9px 6px}
.v8c tr.concl td:last-child{color:var(--accent)}
.v8c .conclflex{display:flex;align-items:center;gap:10px}
.v8c .concldelta{flex:1;text-align:center;font-size:12px;font-weight:500;color:var(--muted);white-space:normal}
.v8c tr.cmarg td{font-size:13px;font-weight:600;padding:8px 6px;color:var(--ink)}
.v8c tr.cmarg td:last-child{color:var(--accent)}
.v8c tr.muted td{color:var(--muted)}
.v8c tr.spacer td{height:14px;padding:0;border-bottom:2px solid var(--line)}
.v8c tr.wrow td{border-top:2px solid var(--line);padding-top:8px}
.v8c tr.wrow input{text-align:right}
.v8c .sticky{position:sticky;top:16px}
@media (max-width:920px){.v8c .sticky{position:static}}
.v8c .compare{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.v8c .panel{border:1px solid var(--line);border-radius:8px;padding:12px}
.v8c .panel.notional{border-top:4px solid var(--accent)}
.v8c .panel.market{border-top:4px solid var(--accent2)}
.v8c .panel h4{margin:0 0 8px;font-size:14px}
.v8c .row{display:flex;justify-content:space-between;font-size:13px;padding:3px 0;gap:8px}
.v8c .row.big{font-size:15px;font-weight:700;margin-top:4px}
.v8c .row.sum span:last-child{border-top:1.5px solid var(--ink);padding-top:3px;min-width:80px;text-align:right}
.v8c .row .l{color:var(--muted)}
.v8c .row span:last-child{white-space:nowrap}
.v8c .neg{color:var(--warn)}
.v8c .bars{margin-top:14px}
.v8c .bar{display:grid;grid-template-columns:110px 1fr 96px;gap:8px;align-items:center;font-size:13px;margin:6px 0}
.v8c .track{height:16px;background:var(--bg);border-radius:4px;position:relative;overflow:hidden}
.v8c .fill{position:absolute;top:0;bottom:0;border-radius:4px}
.v8c .note{font-size:13px;background:#fdf3ef;border:1px solid #f0cfc4;color:#7a2f1d;border-radius:8px;padding:10px 12px;margin-top:12px}
.v8c .note.ok{background:#eef7f4;border-color:#cbe5dc;color:#1d5246}
.v8c .gap{font-size:14px;margin-top:12px}
.v8c .heat td,.v8c .heat th{text-align:center;padding:6px 4px;font-size:11px;white-space:nowrap;border:1px solid #fff}
.v8c .heat th{background:var(--bg);color:var(--muted);font-weight:600}
.v8c .heat td.cur{outline:2px solid var(--ink);outline-offset:-2px;font-weight:700}
.v8c .legend{display:flex;gap:14px;flex-wrap:wrap;font-size:12px;color:var(--muted);margin-top:8px}
.v8c .sw{display:inline-block;width:12px;height:12px;border-radius:2px;vertical-align:-2px;margin-right:4px}
.v8c details summary{cursor:pointer;font-size:13px;color:var(--accent);margin-top:6px}
.v8c .foot{font-size:12px;color:var(--muted);max-width:900px;margin-top:8px}
</style>
