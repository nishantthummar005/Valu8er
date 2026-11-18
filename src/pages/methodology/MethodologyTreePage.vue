<!--
  MethodologyTree.vue: Valuation methodology decision tree (public website version).
  Self-contained: no props, no dependencies. Works with Vue 3 (and Vue 2.6+).
  Styles are namespaced under the component's root class, so they won't affect the rest of the site.
-->
<template>
  <div v-pre class="v8t collapsed" id="tree">
<div class="wrap">

<h1>Choosing a business valuation methodology</h1>
<p class="lede">Answer each question to follow your path through the tree. The highlighted route ends at the methodology that fits the business. You can also read the full tree as it is.</p>

<div class="resultbar" id="resultbar" aria-live="polite">
  <div class="rt">
    <div class="rk" id="rk">Your path</div>
    <div class="rv" id="rv">Start with question 1</div>
    <div class="rd" id="rd">Click Yes or No on each question to follow the tree.</div>
  </div>
  <div class="viewseg" role="group" aria-label="Tree view"><button type="button" class="vb" data-view="collapse" aria-pressed="true">Collapse all</button><button type="button" class="vb" data-view="show" aria-pressed="false">Show all</button></div>
  <button type="button" class="reset" id="reset">↺ Start over</button>
</div>

<section class="stage">
  <div class="stagetag"><b>1</b>Is there transferable commercial goodwill?</div>

  <div class="row">
    <div class="q" id="q1">
      <div class="qtop"><span class="qn">1</span><div><h3>Is the entity a going concern? <span class="tipwrap"><button type="button" class="tipbtn" data-pop="tipGc" aria-expanded="false" aria-controls="tipGc" aria-label="Guidance: What is a going concern?"><svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"/><path d="M10 21h4"/><path d="M12 3a6 6 0 0 0-3.6 10.8c.6.5 1 1.2 1.1 2V17h5v-1.2c.1-.8.5-1.5 1.1-2A6 6 0 0 0 12 3z"/></svg></button><span class="tippop" id="tipGc" role="dialog" aria-label="What is a going concern?" hidden><span class="tiphead">What is a going concern?<button type="button" class="tipx" aria-label="Close">×</button></span><span class="tipbody">A going concern is a business that is financially stable and expected to continue to operate and meet its obligations for at least the next 12 months.</span></span></span></h3></div></div>
      <div class="ans"><button type="button" data-q="q1" data-a="yes" aria-pressed="false">Yes</button><button type="button" data-q="q1" data-a="no" aria-pressed="false">No</button></div>
    </div>
    <div class="hconn" data-e="q1-no"><span>No</span></div>
    <div class="out asset" id="o-liq" data-if="If No"><small>Asset approach</small><b>Liquidation Methodology <span class="tipwrap onhit"><button type="button" class="tipbtn" data-pop="tipLiq" aria-expanded="false" aria-controls="tipLiq" aria-label="Guidance: Valuing in liquidation"><svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"/><path d="M10 21h4"/><path d="M12 3a6 6 0 0 0-3.6 10.8c.6.5 1 1.2 1.1 2V17h5v-1.2c.1-.8.5-1.5 1.1-2A6 6 0 0 0 12 3z"/></svg></button><span class="tippop tipright" id="tipLiq" role="dialog" aria-label="Valuing in liquidation" hidden><span class="tiphead">Valuing in liquidation<button type="button" class="tipx" aria-label="Close">×</button></span><span class="tipbody">A liquidation methodology will require hiring a liquidator and/or asset appraiser to determine value, and cannot be valued using traditional methodologies.</span></span></span></b><p>Value based on what the assets would net if sold, less liabilities and costs.</p></div>
  </div>

  <div class="vconn" data-e="q1-yes"><span>Yes</span></div>

  <div class="row">
    <div class="q" id="q2">
      <div class="qtop"><span class="qn">2</span><div><h3>Does the entity have transferable commercial goodwill?</h3>
        <div class="sub">Click <b>No</b> (no commercial goodwill) if any of the following apply:</div>
        <div class="chips"><span class="chip">Holding company</span><span class="chip">Medical professional corporation</span><span class="chip">Personal services business</span><span class="chip">Subcontractor billing corporation</span><span class="chip">No buyer would pay beyond its net tangible assets</span></div>
      </div></div>
      <div class="ans"><button type="button" data-q="q2" data-a="yes" aria-pressed="false">Yes</button><button type="button" data-q="q2" data-a="no" aria-pressed="false">No</button></div>
    </div>
    <div class="hconn" data-e="q2-no"><span>No</span></div>
    <div class="out asset" id="o-abv" data-if="If No"><small>Asset approach</small><b>Adjusted Book Value (ABV) Methodology</b><p>Net tangible assets restated to fair market value, with no goodwill.</p></div>
  </div>
</section>

<div class="gap"><div class="vconn" data-e="q2-yes"><span>Yes</span></div></div>

<section class="stage">
  <div class="stagetag"><b>2</b>How is the business priced?</div>

  <div class="row">
    <div class="q" id="q3">
      <div class="qtop"><span class="qn">3</span><div><h3>Are you valuing a profitable, operational software business with predictable software revenues?</h3><div class="sub">Not a start-up or pre-revenue business. <span class="tipwrap"><button type="button" class="tipbtn" data-pop="tipStart" aria-expanded="false" aria-controls="tipStart" aria-label="Guidance: Why exclude start-ups and pre-revenue businesses?"><svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"/><path d="M10 21h4"/><path d="M12 3a6 6 0 0 0-3.6 10.8c.6.5 1 1.2 1.1 2V17h5v-1.2c.1-.8.5-1.5 1.1-2A6 6 0 0 0 12 3z"/></svg></button><span class="tippop" id="tipStart" role="dialog" aria-label="Why exclude start-ups and pre-revenue businesses?" hidden><span class="tiphead">Why exclude start-ups and pre-revenue businesses?<button type="button" class="tipx" aria-label="Close">×</button></span><span class="tipbody">The values of start-ups and pre-revenue businesses lie in the eyes of the beholder. In other words, it requires meeting the right investor or synergistic partner to maximize value, and such businesses cannot be valued using traditional methodologies.</span></span></span></div></div></div>
      <div class="ans"><button type="button" data-q="q3" data-a="yes" aria-pressed="false">Yes</button><button type="button" data-q="q3" data-a="no" aria-pressed="false">No</button></div>
    </div>
    <div class="hconn" data-e="q3-yes"><span>Yes</span></div>
    <div class="out sales" id="o-sales" data-if="If Yes"><small>Market approach</small><b>Market Approach: Sales</b><p>A revenue multiple drawn from comparable software transactions.</p></div>
  </div>

  <div class="vconn" data-e="q3-no"><span>No</span></div>

  <div class="q q4" id="q4">
    <div class="qtop"><span class="qn">4</span><div><h3>Who is the most likely buyer of the business? <span class="tipwrap"><button type="button" class="tipbtn" data-pop="tipBuyer" aria-expanded="false" aria-controls="tipBuyer" aria-label="Guidance: Who usually buys small businesses?"><svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"/><path d="M10 21h4"/><path d="M12 3a6 6 0 0 0-3.6 10.8c.6.5 1 1.2 1.1 2V17h5v-1.2c.1-.8.5-1.5 1.1-2A6 6 0 0 0 12 3z"/></svg></button><span class="tippop" id="tipBuyer" role="dialog" aria-label="Who usually buys small businesses?" hidden><span class="tiphead">Who usually buys small businesses?<button type="button" class="tipx" aria-label="Close">×</button></span><span class="tipbody">The majority of small businesses with revenues under $3 million sell to a prospective owner-operator.<span class="tipds"><span class="badge b-ds">DealStats</span> A Valu8er analysis of DealStats data found that about 78% of businesses with revenues between $100,000 and $3 million in the USA and Canada sold for a multiple of SDE.</span></span></span></span></h3></div></div>
    <div class="ans">
      <button type="button" data-q="q4" data-a="sde" aria-pressed="false"><strong class="optlab">A prospective owner-operator</strong> <small class="sugg">(suggested if sales &lt; $3M)</small><em>Buys the business to work in it, so values it on SDE</em></button>
      <button type="button" data-q="q4" data-a="ebitda" aria-pressed="false"><strong class="optlab">An investment firm, PE firm or larger competitor</strong> <small class="sugg">(suggested if sales &gt; $3M)</small><em>Buys the business to work on it, so values it on EBITDA</em></button>
    </div>
  </div>

  <div class="split q4split"><i class="stem" data-e="q4-any"></i><i class="bl" data-e="q4-sde"></i><i class="br" data-e="q4-ebitda"></i><i class="dl" data-e="q4-sde"></i><i class="dr" data-e="q4-ebitda"></i></div>

  <div class="branches">
    <div class="branch" id="b-sde">
      <div class="btag sde">SDE branch · owner-operator buyer</div>
      <div class="q" id="q5s">
        <div class="qtop"><span class="qn">5</span><div><h3>Is the business' normalized Sellers' Discretionary Earnings (‘SDE’) at least $100k?</h3></div></div>
        <div class="ans"><button type="button" data-q="q5s" data-a="yes" aria-pressed="false">Yes</button><button type="button" data-q="q5s" data-a="no" aria-pressed="false">No</button></div>
        <button type="button" class="calcbtn" data-for="q5s" aria-expanded="false"><svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M8 11h2M12 11h2M16 11h0M8 15h2M12 15h2M16 15v2"/></svg>Need help? Click here for the SDE Calculator</button>
        <div class="calcslot" id="slot-q5s"><div class="calcpanel" id="calcS" data-kind="s" hidden>
  <div class="cphead">SDE calculator <span>Use the latest twelve months (TTM). Two worked examples are shown beside your figures.</span></div>
  <div class="ownq"><span>How many owner-operators work in the business?</span>
    <div class="seg"><button type="button" class="segb" data-own="1" aria-pressed="true">One</button><button type="button" class="segb" data-own="m" aria-pressed="false">Multiple</button></div>
    <label class="howmany" hidden>How many owner-operators? <input type="number" class="cnt" min="2" step="1" value="2"></label>
  </div>
  <div class="cpwrap"><div class="cpgrid">
    <span></span><span class="ch subj">Subject business</span><span class="ch" id="calcSH0">Example 1</span><span class="ch" id="calcSH1">Example 2</span>
    <label class="cl">Reported net income (starting point)</label><input type="text" inputmode="decimal" class="cin" data-k="ni" value="0"><span class="ex" data-ex="0" data-k="ni"></span><span class="ex" data-ex="1" data-k="ni"></span>
    <label class="cl">Add: interest, taxes, depreciation &amp; amortization</label><input type="text" inputmode="decimal" class="cin" data-k="itda" value="0"><span class="ex" data-ex="0" data-k="itda"></span><span class="ex" data-ex="1" data-k="itda"></span>
    <label class="cl">Add: discretionary, personal &amp; non-business expenses</label><input type="text" inputmode="decimal" class="cin" data-k="disc" value="0"><span class="ex" data-ex="0" data-k="disc"></span><span class="ex" data-ex="1" data-k="disc"></span>
    <label class="cl">Add: one-time, non-recurring &amp; non-market value items</label><input type="text" inputmode="decimal" class="cin" data-k="one" value="0"><span class="ex" data-ex="0" data-k="one"></span><span class="ex" data-ex="1" data-k="one"></span>
    <label class="cl">Add: salaries paid to relatives and other non-arm's-length individuals</label><input type="text" inputmode="decimal" class="cin" data-k="rel" value="0"><span class="ex" data-ex="0" data-k="rel"></span><span class="ex" data-ex="1" data-k="rel"></span>
    <label class="cl">Less: market value of salaries paid to relatives</label><input type="text" inputmode="decimal" class="cin neg" data-k="relm" value="0"><span class="ex" data-ex="0" data-k="relm"></span><span class="ex" data-ex="1" data-k="relm"></span>
    <label class="cl ownSalL">Add: salaries paid to owner-operator</label><input type="text" inputmode="decimal" class="cin" data-k="own" value="0"><span class="ex" data-ex="0" data-k="own"></span><span class="ex" data-ex="1" data-k="own"></span>
    <label class="cl multi-only ownMktL">Less: market value of 1 owner-operator (2 minus 1)</label><input type="text" inputmode="decimal" class="cin neg multi-only" data-k="ownm" value="0"><span class="ex multi-only" data-ex="0" data-k="ownm"></span><span class="ex multi-only" data-ex="1" data-k="ownm"></span>
    <label class="cl">Other adjustments</label><input type="text" inputmode="decimal" class="cin" data-k="oth" value="0"><span class="ex" data-ex="0" data-k="oth"></span><span class="ex" data-ex="1" data-k="oth"></span>
    <span class="tl">Normalized Sellers' Discretionary Earnings (SDE)</span><b class="ctot">$0</b><b class="extot" data-ex="0"></b><b class="extot" data-ex="1"></b>
    <span class="tq">At least $100,000?</span><span class="ctest"></span><span class="extest" data-ex="0"></span><span class="extest" data-ex="1"></span>
    <span class="tq">Appropriate methodology</span><span class="cmeth"></span><span class="exmeth" data-ex="0"></span><span class="exmeth" data-ex="1"></span>
  </div></div>
  <div class="cpres"></div>
  <button type="button" class="cpapply">Click here to use the above subject result to answer question 5 →</button>
</div></div>
      </div>
      <div class="sideexit"><span class="ifl" data-e="q5s-no">↳ If No</span><div class="out asset" id="o-abv-s"><small>Asset approach</small><b>Adjusted Book Value (ABV) Methodology <span class="tipwrap onhit"><button type="button" class="tipbtn" data-pop="tipAbvS" aria-expanded="false" aria-controls="tipAbvS" aria-label="Guidance: Why Adjusted Book Value?"><svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"/><path d="M10 21h4"/><path d="M12 3a6 6 0 0 0-3.6 10.8c.6.5 1 1.2 1.1 2V17h5v-1.2c.1-.8.5-1.5 1.1-2A6 6 0 0 0 12 3z"/></svg></button><span class="tippop" id="tipAbvS" role="dialog" aria-label="Why Adjusted Book Value?" hidden><span class="tiphead">Why Adjusted Book Value?<button type="button" class="tipx" aria-label="Close">×</button></span><span class="tipbody">Small businesses with SDE less than $100k are often difficult to sell because prospective buyers can earn more from a job without any financial commitment. Accordingly, such businesses are valued using the Adjusted Book Value Method (no goodwill).</span></span></span></b><p>No goodwill value.</p></div></div>
      <div class="vconn inb" data-e="q5s-yes"><span>Yes</span></div>
      <div class="q" id="q6s">
        <div class="qtop"><span class="qn">6</span><div><h3>Is the small business capital intensive? <span class="tipwrap"><button type="button" class="tipbtn" data-pop="tipCapS" aria-expanded="false" aria-controls="tipCapS" aria-label="Guidance: What is capital intensive?"><svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"/><path d="M10 21h4"/><path d="M12 3a6 6 0 0 0-3.6 10.8c.6.5 1 1.2 1.1 2V17h5v-1.2c.1-.8.5-1.5 1.1-2A6 6 0 0 0 12 3z"/></svg></button><span class="tippop" id="tipCapS" role="dialog" aria-label="What is capital intensive?" hidden><span class="tiphead">What is capital intensive?<button type="button" class="tipx" aria-label="Close">×</button></span><span class="tipbody">A business is considered capital intensive if it requires, on average, at least $10,000 per year in capital assets.</span></span></span></h3></div></div>
        <div class="ans"><button type="button" data-q="q6s" data-a="yes" aria-pressed="false">Yes</button><button type="button" data-q="q6s" data-a="no" aria-pressed="false">No</button></div>
      </div>
      <div class="split"><i class="stem" data-e="q6s-any"></i><i class="bl" data-e="q6s-yes"></i><i class="br" data-e="q6s-no"></i><i class="dl" data-e="q6s-yes"></i><i class="dr" data-e="q6s-no"></i><span class="lbl l" data-e="q6s-yes">Yes</span><span class="lbl r" data-e="q6s-no">No</span></div>
      <div class="pair">
        <div class="out multi" id="o-sde-multi"><small>Multiple methodologies</small><b>Capitalized Cash Flows (SDE) and Market Approach (SDE)</b><div class="note"><span class="badge b-ivs">IVS</span><span>Corroborate and reconcile the two, don't average them (IVS 103, 10.07–10.10).</span></div></div>
        <div class="out market" id="o-sde-mkt"><small>Market approach</small><b>Market Approach (SDE)</b><p>TTM SDE times a multiple from comparable transactions.</p></div>
      </div>
    </div>

    <div class="branch" id="b-eb">
      <div class="btag eb">EBITDA branch · investor or strategic buyer</div>
      <div class="q" id="q5e">
        <div class="qtop"><span class="qn">5</span><div><h3>Is the business' normalized EBITDA at least $100k?</h3></div></div>
        <div class="ans"><button type="button" data-q="q5e" data-a="yes" aria-pressed="false">Yes</button><button type="button" data-q="q5e" data-a="no" aria-pressed="false">No</button></div>
        <button type="button" class="calcbtn" data-for="q5e" aria-expanded="false"><svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M8 11h2M12 11h2M16 11h0M8 15h2M12 15h2M16 15v2"/></svg>Need help? Click here for the EBITDA Calculator</button>
        <div class="calcslot" id="slot-q5e"><div class="calcpanel" id="calcE" data-kind="e" hidden>
  <div class="cphead">EBITDA calculator <span>Use the latest twelve months (TTM). Two worked examples are shown beside your figures.</span></div>
  <div class="cpwrap"><div class="cpgrid">
    <span></span><span class="ch subj">Subject business</span><span class="ch" id="calcEH0">Example 1</span><span class="ch" id="calcEH1">Example 2</span>
    <label class="cl">Reported net income (starting point)</label><input type="text" inputmode="decimal" class="cin" data-k="ni" value="0"><span class="ex" data-ex="0" data-k="ni"></span><span class="ex" data-ex="1" data-k="ni"></span>
    <label class="cl">Add: interest, taxes, depreciation &amp; amortization</label><input type="text" inputmode="decimal" class="cin" data-k="itda" value="0"><span class="ex" data-ex="0" data-k="itda"></span><span class="ex" data-ex="1" data-k="itda"></span>
    <label class="cl">Add: discretionary, personal &amp; non-business expenses</label><input type="text" inputmode="decimal" class="cin" data-k="disc" value="0"><span class="ex" data-ex="0" data-k="disc"></span><span class="ex" data-ex="1" data-k="disc"></span>
    <label class="cl">Add: one-time, non-recurring &amp; non-market value items</label><input type="text" inputmode="decimal" class="cin" data-k="one" value="0"><span class="ex" data-ex="0" data-k="one"></span><span class="ex" data-ex="1" data-k="one"></span>
    <label class="cl">Add: salaries paid to relatives and other non-arm's-length individuals</label><input type="text" inputmode="decimal" class="cin" data-k="rel" value="0"><span class="ex" data-ex="0" data-k="rel"></span><span class="ex" data-ex="1" data-k="rel"></span>
    <label class="cl">Less: market value of salaries paid to relatives</label><input type="text" inputmode="decimal" class="cin neg" data-k="relm" value="0"><span class="ex" data-ex="0" data-k="relm"></span><span class="ex" data-ex="1" data-k="relm"></span>
    <label class="cl">Add: salaries paid to owner(s)</label><input type="text" inputmode="decimal" class="cin" data-k="own" value="0"><span class="ex" data-ex="0" data-k="own"></span><span class="ex" data-ex="1" data-k="own"></span>
    <label class="cl">Less: market value of owner(s)</label><input type="text" inputmode="decimal" class="cin neg" data-k="ownm" value="0"><span class="ex" data-ex="0" data-k="ownm"></span><span class="ex" data-ex="1" data-k="ownm"></span>
    <label class="cl">Other adjustments</label><input type="text" inputmode="decimal" class="cin" data-k="oth" value="0"><span class="ex" data-ex="0" data-k="oth"></span><span class="ex" data-ex="1" data-k="oth"></span>
    <span class="tl">Normalized EBITDA</span><b class="ctot">$0</b><b class="extot" data-ex="0"></b><b class="extot" data-ex="1"></b>
    <span class="tq">At least $100,000?</span><span class="ctest"></span><span class="extest" data-ex="0"></span><span class="extest" data-ex="1"></span>
    <span class="tq">Appropriate methodology</span><span class="cmeth"></span><span class="exmeth" data-ex="0"></span><span class="exmeth" data-ex="1"></span>
  </div></div>
  <div class="cpres"></div>
  <button type="button" class="cpapply">Click here to use the above subject result to answer question 5 →</button>
</div></div>
      </div>
      <div class="sideexit"><span class="ifl" data-e="q5e-no">↳ If No</span><div class="out asset" id="o-abv-e"><small>Asset approach</small><b>Adjusted Book Value (ABV) Methodology <span class="tipwrap onhit"><button type="button" class="tipbtn" data-pop="tipAbvE" aria-expanded="false" aria-controls="tipAbvE" aria-label="Guidance: Why Adjusted Book Value?"><svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"/><path d="M10 21h4"/><path d="M12 3a6 6 0 0 0-3.6 10.8c.6.5 1 1.2 1.1 2V17h5v-1.2c.1-.8.5-1.5 1.1-2A6 6 0 0 0 12 3z"/></svg></button><span class="tippop tipright" id="tipAbvE" role="dialog" aria-label="Why Adjusted Book Value?" hidden><span class="tiphead">Why Adjusted Book Value?<button type="button" class="tipx" aria-label="Close">×</button></span><span class="tipbody">A business with an EBITDA less than $100k will be a difficult sale to an investment firm, private equity or a larger competitor. Accordingly, such businesses are valued using the Adjusted Book Value Method (no goodwill).</span></span></span></b><p>No goodwill value.</p></div></div>
      <div class="vconn inb" data-e="q5e-yes"><span>Yes</span></div>
      <div class="q" id="q6e">
        <div class="qtop"><span class="qn">6</span><div><h3>Is the business capital intensive? <span class="tipwrap"><button type="button" class="tipbtn" data-pop="tipCapE" aria-expanded="false" aria-controls="tipCapE" aria-label="Guidance: What is capital intensive?"><svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"/><path d="M10 21h4"/><path d="M12 3a6 6 0 0 0-3.6 10.8c.6.5 1 1.2 1.1 2V17h5v-1.2c.1-.8.5-1.5 1.1-2A6 6 0 0 0 12 3z"/></svg></button><span class="tippop" id="tipCapE" role="dialog" aria-label="What is capital intensive?" hidden><span class="tiphead">What is capital intensive?<button type="button" class="tipx" aria-label="Close">×</button></span><span class="tipbody">A business is considered capital intensive if it requires, on average, at least $10,000 per year in capital assets.</span></span></span></h3></div></div>
        <div class="ans"><button type="button" data-q="q6e" data-a="yes" aria-pressed="false">Yes</button><button type="button" data-q="q6e" data-a="no" aria-pressed="false">No</button></div>
      </div>
      <div class="split"><i class="stem" data-e="q6e-any"></i><i class="bl" data-e="q6e-yes"></i><i class="br" data-e="q6e-no"></i><i class="dl" data-e="q6e-yes"></i><i class="dr" data-e="q6e-no"></i><span class="lbl l" data-e="q6e-yes">Yes</span><span class="lbl r" data-e="q6e-no">No</span></div>
      <div class="pair">
        <div class="out multi" id="o-eb-multi"><small>Multiple methodologies</small><b>Capitalized Cash Flows (EBITDA) and Market Approach (EBITDA)</b><div class="note"><span class="badge b-ivs">IVS</span><span>Corroborate and reconcile the two, don't average them (IVS 103, 10.07–10.10).</span></div></div>
        <div class="out market" id="o-eb-mkt"><small>Market approach</small><b>Market Approach (EBITDA)</b><p>TTM EBITDA times a multiple from comparable transactions.</p></div>
      </div>
    </div>
  </div>
</section>


<div class="legend">
  <span><i style="background:#eef1f4;border-color:#b9c3ce"></i>Asset approach</span>
  <span><i style="background:#f1edfb;border-color:#c5b6ec"></i>Market approach: sales</span>
  <span><i style="background:#e9f5f1;border-color:#a9d6c7"></i>Market approach: SDE or EBITDA</span>
  <span><i style="background:#eaf1f8;border-color:#a9c3de"></i>Multiple methodologies</span>
  <span><i style="background:var(--path);border-color:var(--path)"></i>Your path</span>
</div>

<p class="foot">This decision tree is an educational guide to common methodology choices. It is not a valuation opinion or advice, and the right methodology for a specific engagement depends on its facts and the applicable professional standards.</p>

</div>
</div>
</template>

<script lang="ts">
// @ts-nocheck
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MethodologyTree',
  mounted() {
    var self = this, tracked = [];
    var docAdd = document.addEventListener, winAdd = window.addEventListener;
    document.addEventListener = function (t, f, o) { tracked.push([document, t, f, o]); return docAdd.call(document, t, f, o); };
    window.addEventListener = function (t, f, o) { tracked.push([window, t, f, o]); return winAdd.call(window, t, f, o); };
    try {
      (function () {
      
      (function(){
        var T={
          q1:{yes:'q2',no:'o-liq'},
          q2:{yes:'q3',no:'o-abv'},
          q3:{yes:'o-sales',no:'q4'},
          q4:{sde:'q5s',ebitda:'q5e'},
          q5s:{yes:'q6s',no:'o-abv-s'},
          q5e:{yes:'q6e',no:'o-abv-e'},
          q6s:{yes:'o-sde-multi',no:'o-sde-mkt'},
          q6e:{yes:'o-eb-multi',no:'o-eb-mkt'}
        };
        var root = (self && self.$el) || document.getElementById('tree'), ans = {};
        function el(id) { return (root && root.querySelector && root.querySelector('#' + id)) || document.getElementById(id); }
        function render(){
          var on=['q1'],edges=[],cur='q1',hit=null;
          while(T[cur]&&ans[cur]){var a=ans[cur];edges.push(cur+'-'+a);if(cur==='q4'||cur==='q6s'||cur==='q6e')edges.push(cur+'-any');var n=T[cur][a];on.push(n);cur=n;}
          if(!T[cur])hit=cur;
          var started=Object.keys(ans).length>0;
          root.classList.toggle('walking',started);
          var pk=(on.indexOf('q5s')>-1)?'sde':(on.indexOf('q5e')>-1)?'eb':'';
          root.classList.toggle('pick-sde',pk==='sde');root.classList.toggle('pick-eb',pk==='eb');
          root.querySelectorAll('.q,.out,.branch').forEach(function(x){x.classList.remove('on','cur','hit');});
          on.forEach(function(id){var x=el(id);if(x)x.classList.add('on');});
          if(on.indexOf('q5s')>-1)el('b-sde').classList.add('on');
          if(on.indexOf('q5e')>-1)el('b-eb').classList.add('on');
          if(started&&!hit&&el(cur))el(cur).classList.add('cur');
          root.querySelectorAll('[data-e]').forEach(function(x){x.classList.toggle('lit',edges.indexOf(x.dataset.e)>-1);});
          root.querySelectorAll('.ans button').forEach(function(b){b.setAttribute('aria-pressed',(on.indexOf(b.dataset.q)>-1&&ans[b.dataset.q]===b.dataset.a)?'true':'false');});
          var bar=el('resultbar');
          if(hit){
            var o=el(hit);o.classList.add('hit');
            el('rk').textContent='Recommended methodology';
            el('rv').textContent=o.dataset.result||o.querySelector('b').firstChild.textContent.trim();
            var d=o.querySelector('p')||o.querySelector('.note span:last-child');
            el('rd').textContent=d?d.textContent:'';
            bar.classList.add('done');
          } else {
            bar.classList.remove('done');
            el('rk').textContent='Your path';
            var n=el(cur).querySelector('.qn').textContent;
            el('rv').textContent=started?'Next: question '+n:'Start with question 1';
            el('rd').textContent=started?el(cur).querySelector('h3').textContent.replace(/\*+$/,''):'Click Yes or No on each question to follow the tree.';
          }
        }
        root.addEventListener('click',function(e){
          var b=e.target.closest('.ans button');if(!b)return;
          ans[b.dataset.q]=b.dataset.a;render();
        });
        function closeTips(){root.querySelectorAll('.tippop').forEach(function(p){p.hidden=true;});root.querySelectorAll('.tipbtn').forEach(function(b){b.setAttribute('aria-expanded','false');});}
        document.addEventListener('click',function(e){
          var t=e.target.closest('.tipbtn');
          if(t){var p=el(t.dataset.pop),open=p.hidden;closeTips();p.hidden=!open;t.setAttribute('aria-expanded',open?'true':'false');return;}
          if(e.target.closest('.tipx')){closeTips();return;}
          if(!e.target.closest('.tippop'))closeTips();
        });
        document.addEventListener('keydown',function(e){if(e.key==='Escape')closeTips();});
      
      
        function cv(x){var n=parseFloat(String(x.value).replace(/[,\s$]/g,''));return isFinite(n)?n:0;}
        function fmt(n){return (n<0?'–':'')+'$'+Math.abs(Math.round(n)).toLocaleString('en-CA');}
        var EX={
          e:[{ni:70000,itda:76000,disc:30000,one:11000,rel:75000,relm:-110000,own:60000,ownm:-125000,oth:5000},{ni:125000,itda:50000,disc:25000,one:30000,rel:50000,relm:-10000,own:120000,ownm:-150000,oth:4000}],
          s1:[{ni:70000,itda:20000,disc:5000,one:11000,rel:50000,relm:-110000,own:40000,ownm:0,oth:5000},{ni:125000,itda:50000,disc:25000,one:30000,rel:50000,relm:-10000,own:120000,ownm:0,oth:4000}],
          sm:[{ni:70000,itda:76000,disc:30000,one:11000,rel:75000,relm:-110000,own:60000,ownm:-125000,oth:5000},{ni:125000,itda:50000,disc:25000,one:30000,rel:50000,relm:-10000,own:120000,ownm:-150000,oth:4000}]
        };
        function tot(v,useM){return v.ni+v.itda+v.disc+v.one+v.rel+v.relm+v.own+v.oth+(useM?v.ownm:0);}
        function meth(pass,lab){return pass?(lab):('ABV (no goodwill)');}
        function calcP(P){
          var v={},multi=P.classList.contains('multi'),kind=P.dataset.kind,useM=kind==='e'||multi;
          P.querySelectorAll('.cin').forEach(function(i){var n=cv(i);if(i.classList.contains('neg'))n=-Math.abs(n);v[i.dataset.k]=n;});
          var c=2;
          if(kind==='s'){c=Math.max(2,Math.round(cv(P.querySelector('.cnt'))||2));
            P.querySelector('.ownSalL').textContent=multi?'Add: salaries paid to all owners':'Add: salaries paid to owner-operator';
            P.querySelector('.ownMktL').textContent='Less: market value of '+(c-1)+' owner-operator'+(c-1===1?'':'s')+' ('+c+' minus 1)';}
          var t=tot(v,useM),lab=kind==='s'?'SDE':'EBITDA',pass=t>=100000;
          P.querySelector('.ctot').textContent=fmt(t);
          P.querySelector('.ctest').innerHTML='<span class="'+(pass?'ok':'no')+'">'+(pass?'Yes':'No')+'</span>';
          P.querySelector('.cmeth').innerHTML='<span class="'+(pass?'ok':'no')+'">'+meth(pass,lab)+'</span>';
          var ex=kind==='e'?EX.e:(multi?EX.sm:EX.s1),pid=P.id;
          ex.forEach(function(e,n){
            P.querySelectorAll('.ex[data-ex="'+n+'"]').forEach(function(sp){var val=e[sp.dataset.k];sp.textContent=val===0&&sp.dataset.k==='ownm'&&!useM?'':fmt(val);if(val<0)sp.setAttribute('data-neg','');else sp.removeAttribute('data-neg');});
            var et=tot(e,useM),ep=et>=100000;
            P.querySelector('.extot[data-ex="'+n+'"]').textContent=fmt(et);
            P.querySelector('.extest[data-ex="'+n+'"]').textContent=ep?'Yes':'No';
            P.querySelector('.exmeth[data-ex="'+n+'"]').textContent=meth(ep,lab);
            el(pid+'H'+n).textContent='Example '+(n+1);
          });
          P.querySelector('.cpres').innerHTML='Subject business: normalized '+lab+' of <b>'+fmt(t)+'</b> is '+(pass?'<span class="ok">at least $100,000</span>':'<span class="no">below $100,000</span>')+'. '+'Appropriate methodology: <b>'+meth(pass,lab)+'</b>.';
          P.dataset.ans=pass?'yes':'no';
          var started=cv(P.querySelector('.cin[data-k="ni"]'))!==0;
          P.querySelector('.cpapply').hidden=!started;P.querySelector('.cpres').hidden=!started;
        }
        root.querySelectorAll('.calcpanel').forEach(function(P){
          P.addEventListener('input',function(){calcP(P);});
          P.addEventListener('focusout',function(e){var t=e.target;if(t.classList.contains('cin')&&t.value.trim()!==''){var n=cv(t);if(t.classList.contains('neg'))n=-Math.abs(n);t.value=(n<0?'-':'')+Math.abs(n).toLocaleString('en-CA');calcP(P);}});
          P.addEventListener('click',function(e){
            var sb=e.target.closest('.segb');
            if(sb){P.querySelectorAll('.segb').forEach(function(b){b.setAttribute('aria-pressed',b===sb?'true':'false');});var m=sb.dataset.own==='m';P.classList.toggle('multi',m);P.querySelector('.howmany').hidden=!m;calcP(P);}
            if(e.target.closest('.cpapply')){var q=P.dataset.kind==='s'?'q5s':'q5e';ans[q]=P.dataset.ans;render();}
          });
          calcP(P);
        });
        root.addEventListener('click',function(e){
          var cb=e.target.closest('.calcbtn');if(!cb)return;
          var P=el('slot-'+cb.dataset.for).querySelector('.calcpanel'),open=P.hidden;P.hidden=!open;cb.setAttribute('aria-expanded',open?'true':'false');
        });
        root.querySelectorAll('.vb').forEach(function(b){b.addEventListener('click',function(){
          root.querySelectorAll('.vb').forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false');});
          root.classList.toggle('collapsed',b.dataset.view==='collapse');
        });});
        el('reset').addEventListener('click',function(){ans={};render();});
        render();
      })();
      
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
.v8t{--ink:#16202c;--muted:#5b6776;--line:#d3dae2;--bg:#f6f8fa;--card:#fff;--accent:#1f4e79;--teal:#2f7d6d;--path:#d9822b;
  font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;color:var(--ink);background:var(--bg);line-height:1.45;font-size:15px;padding:32px 16px 56px}
.v8t *{box-sizing:border-box}
.v8t .wrap{max-width:1040px;margin:0 auto}
.v8t h1{font-size:30px;line-height:1.15;margin:0 0 8px;letter-spacing:-.015em}
.v8t .lede{color:var(--muted);max-width:760px;margin:0 0 20px}
.v8t .resultbar{display:flex;gap:14px;align-items:center;flex-wrap:wrap;background:var(--card);border:1px solid var(--line);border-radius:12px;padding:14px 16px;margin-bottom:26px}
.v8t .resultbar .rt{flex:1;min-width:240px}
.v8t .resultbar .rk{font-size:12px;text-transform:uppercase;letter-spacing:.07em;color:var(--muted);font-weight:600}
.v8t .resultbar .rv{font-size:17px;font-weight:700;margin-top:2px}
.v8t .resultbar .rd{font-size:13.5px;color:var(--muted);margin-top:2px}
.v8t .resultbar.done{border-color:var(--path);box-shadow:0 0 0 3px rgba(217,130,43,.15)}
.v8t .reset{font:700 13.5px inherit;padding:9px 16px;border-radius:8px;border:none;background:#1f6fe0;color:#fff;cursor:pointer;box-shadow:0 2px 8px rgba(31,111,224,.35);transition:background .15s}
.v8t .reset:hover{background:#1558b8}
.v8t .stage{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:20px 20px 22px;position:relative}
.v8t .stagetag{display:inline-flex;align-items:center;gap:8px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:var(--accent);margin-bottom:16px}
.v8t .stagetag b{display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:50%;background:var(--accent);color:#fff;font-size:11px;letter-spacing:0}
.v8t .row{display:grid;grid-template-columns:minmax(0,1fr) 92px 272px;align-items:center}
.v8t .q{background:#fff;border:1.5px solid var(--line);border-left:5px solid var(--accent);border-radius:12px;padding:14px 16px;transition:opacity .25s,border-color .25s,box-shadow .25s}
.v8t .qtop{display:flex;gap:12px;align-items:flex-start}
.v8t .qn{flex:none;width:28px;height:28px;border-radius:50%;background:#eaf1f8;color:var(--accent);font-weight:700;font-size:13px;display:flex;align-items:center;justify-content:center;margin-top:1px}
.v8t .q h3{margin:0;font-size:16px;line-height:1.35}
.v8t .q h3 sup{color:var(--path);font-weight:700}
.v8t .q .sub{font-size:13px;color:var(--muted);margin-top:4px}
.v8t .chips{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}
.v8t .chip{font-size:12px;background:var(--bg);border:1px solid var(--line);border-radius:999px;padding:3px 9px;color:var(--muted)}
.v8t .ans{display:flex;gap:8px;flex-wrap:wrap;margin:12px 0 0 40px}
.v8t .ans button{font:600 13px inherit;padding:7px 14px;border-radius:8px;border:1.5px solid var(--line);background:#fff;color:var(--ink);cursor:pointer;transition:all .15s}
.v8t .ans button:hover{border-color:var(--accent);color:var(--accent)}
.v8t .ans button[aria-pressed=true]{background:var(--path);border-color:var(--path);color:#fff}
.v8t .hconn{position:relative;height:2px;background:var(--line);margin:0 6px;transition:background .25s}
.v8t .hconn::after{content:"";position:absolute;right:-2px;top:-5px;border:6px solid transparent;border-left:8px solid var(--line);border-right:0;transition:border-color .25s}
.v8t .hconn span,.v8t .vconn span,.v8t .split .lbl{position:absolute;font-size:12px;font-weight:700;color:var(--muted);background:#fff;padding:1px 8px;border:1px solid var(--line);border-radius:999px;white-space:nowrap;transition:all .25s}
.v8t .hconn span{left:50%;top:-12px;transform:translateX(-50%)}
.v8t .vconn{position:relative;height:42px;width:2px;background:var(--line);margin-left:calc((100% - 364px) / 2);transition:background .25s}
.v8t .vconn::after{content:"";position:absolute;bottom:-2px;left:-5px;border:6px solid transparent;border-top:8px solid var(--line);border-bottom:0;transition:border-color .25s}
.v8t .vconn span{left:12px;top:50%;transform:translateY(-50%)}
.v8t .vconn.wide{margin-left:50%}
.v8t .gap{height:42px;display:flex;justify-content:center}
.v8t .gap .vconn{margin-left:0}
.v8t .out{border-radius:12px;padding:12px 14px;border:1.5px solid;transition:opacity .25s,box-shadow .25s,transform .25s}
.v8t .out small{display:block;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;opacity:.8;margin-bottom:3px}
.v8t .out b{display:block;font-size:15px;line-height:1.3}
.v8t .out p{margin:4px 0 0;font-size:12.5px;opacity:.85}
.v8t .out .note{display:flex;gap:6px;align-items:flex-start;margin-top:8px;padding-top:8px;border-top:1px dashed currentColor;font-size:12px;opacity:.9}
.v8t .asset{background:#eef1f4;border-color:#b9c3ce;color:#2c3a48}
.v8t .sales{background:#f1edfb;border-color:#c5b6ec;color:#3b2775}
.v8t .market{background:#e9f5f1;border-color:#a9d6c7;color:#1b5446}
.v8t .multi{background:#eaf1f8;border-color:#a9c3de;color:#163b5e}
.v8t .badge{display:inline-flex;align-items:center;justify-content:center;height:20px;padding:0 7px;border-radius:10px;font-size:10px;font-weight:700;color:#fff;letter-spacing:.02em;flex:none}
.v8t .b-ivs{background:var(--teal)}
.v8t .b-ds{background:#5b3fa6}
.v8t .q4 .ans button{flex:1;min-width:220px;text-align:left;line-height:1.35}
.v8t .q4 .ans button .optlab{font-weight:700;font-size:14px}
.v8t .q4 .ans button .sugg{white-space:nowrap;font-size:11.5px;font-weight:500;color:var(--muted)}
.v8t .q4 .ans button[aria-pressed=true] .sugg{color:#fff;opacity:.9}
.v8t .q4 .ans button em{display:block;font-style:normal;font-weight:400;font-size:12px;color:var(--muted)}
.v8t .q4 .ans button[aria-pressed=true] em{color:#fff;opacity:.9}
.v8t .split{position:relative;height:46px}
.v8t .split i{position:absolute;background:var(--line);transition:background .25s}
.v8t .split .stem{left:calc(50% - 1px);top:0;width:2px;height:20px}
.v8t .split .bl{left:25%;width:25%;top:20px;height:2px}
.v8t .split .br{left:50%;width:25%;top:20px;height:2px}
.v8t .split .dl{left:calc(25% - 1px);top:20px;width:2px;height:24px}
.v8t .split .dr{left:calc(75% - 1px);top:20px;width:2px;height:24px}
.v8t .split .dl::after,.v8t .split .dr::after{content:"";position:absolute;bottom:-3px;left:-5px;border:6px solid transparent;border-top:8px solid var(--line);border-bottom:0;transition:border-color .25s}
.v8t .split .lbl{top:23px}
.v8t .split .lbl.l{right:calc(75% + 10px)}
.v8t .split .lbl.r{left:calc(75% + 10px)}
.v8t .branches{display:grid;grid-template-columns:1fr 1fr;gap:20px}
.v8t .branch{border:1px dashed var(--line);border-radius:14px;padding:14px;transition:opacity .25s}
.v8t .btag{font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;margin-bottom:10px}
.v8t .btag.sde{color:var(--teal)}
.v8t .btag.eb{color:var(--accent)}
.v8t .branch .q .ans{margin-left:0}
.v8t .pair{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.v8t .notes{margin-top:22px;font-size:13px;color:var(--muted);display:grid;gap:6px}
.v8t .notes div{display:flex;gap:8px;align-items:flex-start}
.v8t .notes sup{color:var(--path);font-weight:700;font-size:13px;min-width:22px}
.v8t .tipwrap{position:relative;display:inline-block;vertical-align:-3px}
.v8t .tipbtn{display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;border-radius:50%;border:1.5px solid #f0c98a;background:#fff6e8;color:#b9691b;cursor:pointer;padding:0;transition:all .15s}
.v8t .tipbtn:hover,.v8t .tipbtn[aria-expanded=true]{background:var(--path);border-color:var(--path);color:#fff}
.v8t .tippop{position:absolute;left:-10px;top:calc(100% + 8px);z-index:30;width:min(340px,80vw);background:#fff;border:1px solid var(--line);border-top:4px solid var(--path);border-radius:10px;box-shadow:0 10px 30px rgba(22,32,44,.18);padding:12px 14px;font-size:13.5px;font-weight:400;line-height:1.45;color:var(--ink);display:block;text-align:left}
.v8t .tippop[hidden]{display:none}
.v8t .tiphead{display:flex;justify-content:space-between;align-items:center;font-weight:700;font-size:14px;margin-bottom:6px}
.v8t .tipx{border:none;background:none;font-size:20px;line-height:1;cursor:pointer;color:var(--muted);padding:0 0 0 8px}
.v8t .tipbody{display:block}
.v8t .out .onhit{display:none}
.v8t .out.hit .onhit{display:inline-block}
.v8t .tippop.tipright{left:auto;right:-10px}
.v8t .out b .tipwrap{vertical-align:-6px;margin-left:4px}
.v8t .tipds{display:block;margin-top:8px;padding-top:8px;border-top:1px dashed var(--line);color:var(--muted)}
.v8t .tipds .badge{vertical-align:1px;margin-right:4px}
.v8t .sideexit{margin:10px 0 0 28px}
.v8t .ifl{display:block;font-size:11px;font-weight:700;color:var(--muted);margin-bottom:4px}
.v8t .ifl.lit{background:none!important;color:var(--path)}
.v8t .vconn.inb{margin-left:30px;margin-top:6px}
.v8t.pick-sde #b-eb,.v8t.pick-eb #b-sde{display:none}
.v8t.pick-sde .branches,.v8t.pick-eb .branches{grid-template-columns:1fr}
.v8t.pick-sde .q4split i:not(.stem),.v8t.pick-eb .q4split i:not(.stem){display:none}
.v8t.pick-sde .q4split .stem,.v8t.pick-eb .q4split .stem{height:40px}
.v8t.pick-sde .q4split .stem::after,.v8t.pick-eb .q4split .stem::after{content:"";position:absolute;bottom:-3px;left:-5px;border:6px solid transparent;border-top:8px solid var(--path);border-bottom:0}
.v8t .calcbtn{display:inline-flex;align-items:center;gap:6px;margin-top:12px;font:600 12.5px inherit;padding:6px 11px;border-radius:8px;border:1.5px dashed #a9c3de;background:#f4f8fc;color:var(--accent);cursor:pointer}
.v8t .calcbtn:hover,.v8t .calcbtn[aria-expanded=true]{border-style:solid;border-color:var(--accent)}
.v8t .calcpanel{margin-top:12px;background:#f8fafc;border:1px solid var(--line);border-radius:10px;padding:14px}
.v8t .calcpanel[hidden]{display:none}
.v8t .cphead{font-weight:700;font-size:14px;margin-bottom:10px;display:flex;flex-wrap:wrap;gap:4px 10px;align-items:baseline}
.v8t .cphead span{font-weight:400;font-size:12px;color:var(--muted)}
.v8t .cpwrap{overflow-x:auto;margin:0 -4px;padding:0 4px}
.v8t .cpgrid{display:grid;grid-template-columns:minmax(200px,1fr) 130px 104px 104px;gap:6px 10px;align-items:center;font-size:13px;min-width:580px}
.v8t .ch{font-size:11.5px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--muted);text-align:right}
.v8t .ch.subj{color:var(--accent)}
.v8t .ex,.v8t .extot,.v8t .extest,.v8t .exmeth{text-align:right;color:var(--muted);font-variant-numeric:tabular-nums}
.v8t .ex{font-size:13px;padding-right:2px}
.v8t .ex.neg,.v8t .ex[data-neg]{color:#b4472f}
.v8t .tl,.v8t .ctot,.v8t .extot{border-top:1.5px solid var(--ink);padding-top:7px;font-weight:700;font-size:14px}
.v8t .ctot{text-align:right;color:var(--ink)}
.v8t .tq{font-size:12.5px;color:var(--muted)}
.v8t .ctest,.v8t .cmeth{text-align:right;font-weight:700}
.v8t .extest,.v8t .exmeth{font-size:12.5px}
.v8t .calcpanel:not(.multi) .multi-only{display:none}
.v8t .cin{-webkit-text-fill-color:currentColor;color-scheme:light;font:inherit;font-size:13.5px;padding:6px 8px;border:1px solid var(--line);border-radius:6px;text-align:right;width:100%;background:#fff;color:var(--ink)}
.v8t .cin.neg{color:#b4472f}
.v8t .cptot{grid-column:1/-1;display:flex;justify-content:space-between;align-items:center;border-top:1.5px solid var(--ink);padding:7px 0 4px;margin-top:2px;font-weight:700;font-size:14px}
.v8t .cpres{margin-top:12px;font-size:13.5px;padding:10px 12px;border-radius:8px;background:#fff;border:1px solid var(--line)}
.v8t .cpres .ok{color:#1b5446;font-weight:700}
.v8t .cpres .no{color:#b4472f;font-weight:700}
.v8t .cpapply{margin-top:10px;font:600 13px inherit;padding:8px 14px;border-radius:8px;border:none;background:var(--path);color:#fff;cursor:pointer}
.v8t .cpapply{animation:v8pulse 1.6s ease-in-out 3}
@keyframes v8pulse{0%,100%{box-shadow:0 0 0 0 rgba(217,130,43,.5)}50%{box-shadow:0 0 0 7px rgba(217,130,43,0)}}
@media (prefers-reduced-motion:reduce){.v8t .cpapply{animation:none}}
.v8t .cpapply[hidden],.v8t .cpres[hidden]{display:none}
.v8t .cpapply:hover{background:#b9691b}

.v8t .ownq{display:flex;flex-wrap:wrap;align-items:center;gap:8px 12px;font-size:13px;margin-bottom:12px;padding-bottom:12px;border-bottom:1px dashed var(--line)}
.v8t .seg{display:inline-flex;border:1.5px solid var(--line);border-radius:8px;overflow:hidden}
.v8t .segb{font:600 12.5px inherit;padding:6px 12px;border:none;background:#fff;color:var(--ink);cursor:pointer}
.v8t .segb[aria-pressed=true]{background:var(--accent);color:#fff}
.v8t .howmany{display:inline-flex;align-items:center;gap:8px;font-size:13px}
.v8t .howmany[hidden]{display:none}
.v8t .cnt{color:#16202c;-webkit-text-fill-color:#16202c;color-scheme:light;font-weight:700;width:64px;font:inherit;padding:5px 8px;border:1px solid var(--line);border-radius:6px;text-align:right;background:#fff8db;border-color:#e6d38a}
.v8t .calcpanel:not(.multi) .multi-only{display:none}
.v8t .viewseg{display:inline-flex;border:1.5px solid var(--line);border-radius:8px;overflow:hidden}
.v8t .vb{font:600 12.5px inherit;padding:8px 12px;border:none;background:#fff;color:var(--ink);cursor:pointer}
.v8t .vb[aria-pressed=true]{background:var(--ink);color:#fff}
.v8t.collapsed .q:not(.on),.v8t.collapsed .out:not(.hit),.v8t.collapsed .hconn:not(.lit),.v8t.collapsed .vconn:not(.lit),
.v8t.collapsed .split:not(:has(.lit)),.v8t.collapsed .split i:not(.lit),.v8t.collapsed .split .lbl:not(.lit),
.v8t.collapsed .sideexit:not(:has(.hit)),.v8t.collapsed .branch:not(.on),.v8t.collapsed .branches:not(:has(.branch.on)),
.v8t.collapsed .stage:not(:has(.q.on)),.v8t.collapsed .gap:not(:has(.lit)),.v8t.collapsed .pair:not(:has(.hit)),.v8t.collapsed .legend{display:none}
.v8t.collapsed .branches{grid-template-columns:1fr}
.v8t.collapsed .branch{border-style:solid}
.v8t .pair>.out:nth-child(2){grid-column:2}
@media (max-width:520px){.v8t .pair>.out:nth-child(2){grid-column:1}}
.v8t .legend{display:flex;flex-wrap:wrap;gap:14px;margin-top:16px;font-size:12px;color:var(--muted)}
.v8t .legend span{display:inline-flex;align-items:center;gap:6px}
.v8t .legend i{width:14px;height:14px;border-radius:4px;border:1.5px solid}
.v8t .foot{font-size:12px;color:var(--muted);margin-top:18px;max-width:860px}
/* walking state */
.v8t.walking .q,.v8t.walking .out{opacity:.38}
.v8t.walking .branch{opacity:.55}
.v8t.walking .on{opacity:1!important}
.v8t.walking .branch.on{opacity:1}
.v8t .q.on{border-color:var(--path)}
.v8t .q.cur{box-shadow:0 0 0 4px rgba(217,130,43,.18)}
.v8t .out.hit{position:relative;z-index:20;opacity:1!important;box-shadow:0 0 0 4px rgba(217,130,43,.28);transform:translateY(-2px);border-color:var(--path)}
.v8t .lit{background:var(--path)!important}
.v8t .hconn.lit::after{border-left-color:var(--path)}
.v8t .vconn.lit::after{border-top-color:var(--path)}
.v8t .split .dl.lit::after,.v8t .split .dr.lit::after{border-top-color:var(--path)}
.v8t .vconn.lit span,.v8t .hconn.lit span,.v8t .split .lbl.lit{color:#fff;background:var(--path);border-color:var(--path)}
@media (max-width:860px){
  .v8t .row{grid-template-columns:1fr}
  .v8t .hconn{display:none}
  .v8t .row .out{margin:10px 0 0 28px;position:relative}
  .v8t .row .out::before{content:"↳ " attr(data-if);position:absolute;left:-28px;top:-2px;transform:translateY(-100%);font-size:11px;font-weight:700;color:var(--muted);white-space:nowrap}
  .v8t .row .out{margin-top:26px}
  .v8t .vconn{margin-left:30px}
  .v8t .vconn.wide{margin-left:30px}
  .v8t .branches{grid-template-columns:1fr}
  .v8t .ans{margin-left:0}
}
@media (max-width:520px){.v8t .pair{grid-template-columns:1fr}.v8t h1{font-size:24px}.v8t .stage{padding:16px 14px}}
</style>
