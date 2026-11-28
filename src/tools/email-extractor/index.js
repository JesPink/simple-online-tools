import { extractEmails, getEmailStats, groupEmailMatches, prepareSourceText, removeEmailMatches } from './engine.js';

const MAX_TEXT_BYTES = 5 * 1024 * 1024;
const MAX_FILE_BYTES = 5 * 1024 * 1024;
const MAX_TOTAL_FILE_BYTES = 20 * 1024 * 1024;
const SUPPORTED_EXTENSIONS = new Set(['txt', 'md', 'csv', 'tsv', 'html', 'htm', 'json', 'xml', 'log', 'yaml', 'yml']);

export function render() {
  return `
    <div class="email-extractor-tool">
      <div class="tool-container">
        <div class="tool-interface">
          <div class="tool-main">
            <section class="form-section">
              <div class="section-title">Extract email addresses from text</div>
              <div class="form-group">
                <label for="email-input">Paste text containing email addresses</label>
                <textarea id="email-input" rows="10" spellcheck="false" placeholder="Paste an email thread, document, contact list, log, or copied text here. We only extract addresses already present in the content."></textarea>
                <p class="email-help">Your text is processed locally in this browser. This tool does not scan websites or discover new contacts.</p>
              </div>
              <div class="form-group email-file-group">
                <label for="email-files">Or upload text files</label>
                <input id="email-files" type="file" multiple accept=".txt,.md,.csv,.tsv,.html,.htm,.json,.xml,.log,.yaml,.yml,text/plain,text/csv,text/html,application/json,application/xml">
                <p class="email-help">TXT, MD, CSV, TSV, HTML, JSON, XML, LOG and YAML. Maximum 5 MB per file and 20 MB total.</p>
                <ul id="email-file-list" class="email-file-list" aria-live="polite"></ul>
              </div>
              <fieldset class="email-options">
                <legend>Extraction options</legend>
                <label class="email-option"><input id="include-obfuscated" type="checkbox" checked> Recognize common obfuscations such as name [at] domain [dot] com</label>
                <label class="email-option"><input id="show-occurrences" type="checkbox"> Show every occurrence instead of grouping duplicates</label>
              </fieldset>
              <div class="email-actions">
                <button id="extract-emails-btn" class="btn btn-primary" type="button">Extract email addresses</button>
                <button id="clear-emails-btn" class="btn btn-secondary" type="button">Clear</button>
              </div>
              <p id="email-status" class="email-status" role="status" aria-live="polite">Paste text or choose one or more supported files to begin.</p>
              <p id="email-error" class="email-error" role="alert" hidden></p>
            </section>
          </div>
          <section class="tool-results email-results" aria-labelledby="email-results-heading">
            <div class="section-title" id="email-results-heading">Extracted email addresses</div>
            <div class="email-stats" aria-live="polite">
              <div class="email-stat"><span id="email-unique-count">0</span><small>Unique addresses</small></div>
              <div class="email-stat"><span id="email-occurrence-count">0</span><small>Total matches</small></div>
              <div class="email-stat"><span id="email-domain-count">0</span><small>Domains</small></div>
            </div>
            <div class="email-result-controls">
              <div class="form-group"><label for="email-domain-filter">Search addresses or domains</label><input id="email-domain-filter" type="search" placeholder="e.g. example.com"></div>
              <div class="form-group"><label for="email-sort">Sort results</label><select id="email-sort"><option value="source">Source order</option><option value="alpha">Email address (A–Z)</option><option value="domain">Domain (A–Z)</option></select></div>
              <div class="form-group"><label for="email-include-domains">Include only these domains</label><input id="email-include-domains" type="text" placeholder="example.com, company.org"></div>
              <div class="form-group"><label for="email-exclude-domains">Exclude these domains</label><input id="email-exclude-domains" type="text" placeholder="blocked.com, old-company.org"></div>
            </div>
            <div class="email-output-controls">
              <div class="form-group">
                <label for="email-separator">Separator for copy and TXT</label>
                <select id="email-separator">
                  <option value="newline">One address per line</option>
                  <option value="comma">Comma and space</option>
                  <option value="semicolon">Semicolon and space</option>
                </select>
              </div>
              <label class="email-option"><input id="lowercase-plain-list" type="checkbox"> Lowercase copied and TXT addresses</label>
              <p class="email-help">CSV and JSON preserve the first-seen spelling. Lowercasing can change a technically case-sensitive email local-part.</p>
            </div>
            <div id="email-domain-summary" class="email-domain-summary" aria-label="Domain counts"></div>
            <div id="email-results-list" class="email-results-list"><p class="email-empty">Your extracted addresses will appear here.</p></div>
            <div class="email-actions email-export-actions">
              <button id="copy-emails-btn" class="btn btn-primary" type="button" disabled>Copy unique emails</button>
              <button id="download-txt-btn" class="btn btn-secondary" type="button" disabled>Download TXT</button>
              <button id="download-csv-btn" class="btn btn-secondary" type="button" disabled>Download CSV</button>
              <button id="download-json-btn" class="btn btn-secondary" type="button" disabled>Download JSON</button>
            </div>
            <section class="email-clean-section">
              <h3>Remove email addresses from the supplied text</h3>
              <p>Create a plain-text copy with detected addresses removed or replaced. Original files are never changed.</p>
              <div class="form-group"><label for="email-removal-text">Replacement text (optional)</label><input id="email-removal-text" type="text" value="" placeholder="[email removed]"></div>
              <button id="create-clean-text-btn" class="btn btn-secondary" type="button" disabled>Create cleaned text</button>
              <textarea id="email-clean-output" rows="6" readonly placeholder="Cleaned text will appear here."></textarea>
              <button id="copy-clean-text-btn" class="btn btn-secondary" type="button" disabled>Copy cleaned text</button>
              <button id="download-clean-text-btn" class="btn btn-secondary" type="button" disabled>Download cleaned text</button>
            </section>
          </section>
        </div>
      </div>
      <div class="seo-content">
        <section class="content-section">
          <h2>Extract email addresses from text online</h2>
          <p>Use this free email extractor to find email addresses already present in text you provide. Paste copied content or upload supported text files to collect addresses into a clean list. Group duplicates, review where each match appeared, filter by domain, and export results as TXT, CSV, or JSON. You can also create a plain-text copy with detected addresses removed.</p>
          <p>This is a text and file email address extractor, not an email scraper. It does not visit websites, crawl URLs, search social networks, discover contacts, verify mailboxes, or send messages. If an address is not present in the content you supply, this tool will not find it.</p>
        </section>
        <section class="content-section">
          <h2>How to use the email extractor</h2>
          <ol class="instruction-list">
            <li><strong>Provide your content:</strong> Paste text or select supported TXT, Markdown, CSV, TSV, HTML, JSON, XML, LOG, or YAML files.</li>
            <li><strong>Choose matching options:</strong> Decide whether to recognize common obfuscated forms such as name [at] domain [dot] com and whether to display duplicate occurrences separately.</li>
            <li><strong>Extract addresses:</strong> Review unique addresses, total matches, domains, source files, and line locations.</li>
            <li><strong>Filter and export:</strong> Search by address or domain, then copy the unique list or download TXT, CSV, or JSON results.</li>
            <li><strong>Optional cleanup:</strong> Create a plain-text version of the supplied content with detected addresses removed or replaced.</li>
          </ol>
        </section>
        <section class="content-section">
          <h2>What makes this email address extractor useful?</h2>
          <ul>
            <li><strong>Duplicate grouping:</strong> Review one row per address with its occurrence count, or show every match separately.</li>
            <li><strong>Source context:</strong> See the source file, line and column for each match, with a short surrounding excerpt.</li>
            <li><strong>Domain controls:</strong> See unique address counts, include only selected domains and subdomains, or exclude domains you do not need.</li>
          <li><strong>Flexible plain lists:</strong> Copy or download TXT output with new lines, commas, or semicolons; optionally lowercase plain-list output. CSV and JSON retain the first-seen spelling.</li>
            <li><strong>Obfuscated address support:</strong> Optionally recognize common written substitutions such as [at] and [dot]. Review these matches because obfuscation can be ambiguous.</li>
            <li><strong>Useful exports:</strong> Copy addresses or download structured TXT, CSV and JSON files.</li>
            <li><strong>Text cleanup:</strong> Remove detected addresses from a plain-text copy without changing the original input or files.</li>
          </ul>
        </section>
        <section class="content-section">
          <h2>Supported input formats and limits</h2>
          <p>The first version reads pasted text and common text-based files: TXT, MD, CSV, TSV, HTML, HTM, JSON, XML, LOG, YAML and YML. HTML tags and script or style blocks are excluded from the text view; mailto link targets are included. Each file is limited to 5 MB, with a combined file limit of 20 MB. Pasted text is limited to 5 MB to keep processing responsive.</p>
          <p>This version does not read PDF, DOCX, XLSX, image or scanned-document contents. A file containing only an image or embedded scan will not yield text matches.</p>
        </section>
        <section class="content-section">
          <h2>Privacy and extraction accuracy</h2>
          <p>Text and files are read and processed locally in your browser. Their contents, extracted addresses, filenames and context excerpts are not sent to our servers or included in analytics events. Nothing is uploaded, and the tool does not save your input to browser storage.</p>
          <p>The extractor identifies address-shaped text; it does not confirm that an address exists, belongs to a particular person, accepts messages, or is safe to contact. Common obfuscated forms can be ambiguous, so review those matches. Internationalized Unicode local-parts and domain labels are supported, but quoted local-parts and mailbox deliverability are not validated. Duplicate grouping is case-insensitive for practical list cleanup and preserves the first spelling found.</p>
        </section>
        <section class="content-section">
          <h2>Frequently asked questions</h2>
          <h4>How do I extract email addresses from text?</h4>
          <p>Paste the text or upload a supported file, then select Extract email addresses. The tool lists detected addresses, groups duplicates by default, and lets you copy or export the results.</p>
          <h4>Can I extract emails from a text file?</h4>
          <p>Yes. Upload supported TXT, CSV, TSV, HTML, JSON, XML, LOG, Markdown or YAML files. Files are read locally and follow the displayed size limits.</p>
          <h4>Does this tool scrape websites or find emails from a domain?</h4>
          <p>No. It only extracts addresses already present in text or files you supply. It does not visit URLs, crawl websites, search domains, or discover new contacts.</p>
          <h4>Can I include or exclude specific domains?</h4>
          <p>Yes. Enter comma-, semicolon-, or space-separated domains in the include or exclude fields. A domain filter also applies to its subdomains and to copied or downloaded results.</p>
          <h4>Can I remove email addresses from text?</h4>
          <p>Yes. Use the cleanup section to create a plain-text copy with detected addresses removed or replaced. Your original input and uploaded files remain unchanged.</p>
          <h4>Does the extractor remove duplicate email addresses?</h4>
          <p>Duplicates are grouped by default and shown with an occurrence count. You can display every match separately, while Copy unique emails always copies one entry per grouped address.</p>
          <h4>Can it verify whether an email address is active?</h4>
          <p>No. It finds address-shaped text only. It does not contact mail servers, send messages, or confirm mailbox existence or deliverability.</p>
          <h4>Are my text and uploaded files private?</h4>
          <p>Processing happens locally in your browser. Supplied content and extracted addresses are not uploaded to our servers or included in analytics events.</p>
        </section>
      </div>
    </div>
  `;
}

export async function init() {
  const el = id => document.getElementById(id);
  const input = el('email-input');
  const fileInput = el('email-files');
  const fileList = el('email-file-list');
  const extractButton = el('extract-emails-btn');
  const clearButton = el('clear-emails-btn');
  const status = el('email-status');
  const error = el('email-error');
  const includeObfuscated = el('include-obfuscated');
  const showOccurrences = el('show-occurrences');
  const domainFilter = el('email-domain-filter');
  const includeDomains = el('email-include-domains');
  const excludeDomains = el('email-exclude-domains');
  const separatorSelect = el('email-separator');
  const lowercaseOutput = el('lowercase-plain-list');
  const sortSelect = el('email-sort');
  const resultsList = el('email-results-list');
  const domainSummary = el('email-domain-summary');
  const uniqueCount = el('email-unique-count');
  const occurrenceCount = el('email-occurrence-count');
  const domainCount = el('email-domain-count');
  const copyButton = el('copy-emails-btn');
  const txtButton = el('download-txt-btn');
  const csvButton = el('download-csv-btn');
  const jsonButton = el('download-json-btn');
  const cleanButton = el('create-clean-text-btn');
  const cleanOutput = el('email-clean-output');
  const replacementInput = el('email-removal-text');
  const copyCleanButton = el('copy-clean-text-btn');
  const downloadCleanButton = el('download-clean-text-btn');

  let sources = [];
  let allMatches = [];
  let groupedMatches = [];
  let hasResults = false;

  function setError(message) { error.textContent = message; error.hidden = !message; }
  function setStatus(message) { status.textContent = message; }
  function makeElement(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  }
  function renderSelectedFiles() {
    fileList.replaceChildren();
    for (const file of Array.from(fileInput.files || [])) {
      fileList.append(makeElement('li', '', file.name + ' · ' + (file.size / 1024).toFixed(1) + ' KB'));
    }
  }
  function parseDomainList(value) {
    return value.split(/[;,\s]+/).map(domain => domain.trim().toLowerCase()).filter(Boolean);
  }
  function domainMatches(domain, filter) {
    return domain === filter || domain.endsWith('.' + filter);
  }
  function visibleGroups() {
    const filter = domainFilter.value.trim().toLowerCase();
    const included = parseDomainList(includeDomains.value);
    const excluded = parseDomainList(excludeDomains.value);
    let groups = groupedMatches.filter(group => {
      const matchesSearch = !filter || group.email.toLowerCase().includes(filter) || group.domain.includes(filter);
      const matchesInclude = !included.length || included.some(domain => domainMatches(group.domain, domain));
      const matchesExclude = excluded.some(domain => domainMatches(group.domain, domain));
      return matchesSearch && matchesInclude && !matchesExclude;
    });
    if (sortSelect.value === 'alpha') groups.sort((a, b) => a.email.localeCompare(b.email));
    if (sortSelect.value === 'domain') groups.sort((a, b) => a.domain.localeCompare(b.domain) || a.email.localeCompare(b.email));
    if (sortSelect.value === 'source') groups.sort((a, b) => {
      const firstA = a.occurrences[0], firstB = b.occurrences[0];
      return sources.findIndex(source => source.name === firstA.sourceName) - sources.findIndex(source => source.name === firstB.sourceName) ||
        firstA.line - firstB.line || firstA.column - firstB.column;
    });
    return groups;
  }
  function renderResults() {
    resultsList.replaceChildren();
    domainSummary.replaceChildren();
    const groups = visibleGroups();
    const filter = domainFilter.value.trim();
    const exportEnabled = groups.length > 0;
    for (const button of [copyButton, txtButton, csvButton, jsonButton]) button.disabled = !exportEnabled;
    const rows = showOccurrences.checked
      ? groups.flatMap(group => group.occurrences.map(match => ({ email: group.email, domain: group.domain, count: 1, occurrences: [match] })))
      : groups;
    if (!rows.length) resultsList.append(makeElement('p', 'email-empty', hasResults
      ? (filter || includeDomains.value.trim() || excludeDomains.value.trim() ? 'No addresses match these filters.' : 'No email addresses were found in the supplied content.')
      : 'Your extracted addresses will appear here.'));
    for (const row of rows) {
      const occurrence = row.occurrences[0];
      const card = makeElement('article', 'email-result-row');
      const heading = makeElement('div', 'email-result-heading');
      heading.append(makeElement('strong', 'email-address', row.email));
      if (!showOccurrences.checked && row.count > 1) heading.append(makeElement('span', 'email-occurrence-badge', row.count + ' occurrences'));
      heading.append(makeElement('span', 'email-match-type', occurrence.matchType));
      card.append(heading);
      card.append(makeElement('p', 'email-source', occurrence.sourceName + ' · Line ' + occurrence.line + ', column ' + occurrence.column));
      card.append(makeElement('p', 'email-context', occurrence.context));
      if (!showOccurrences.checked && row.occurrences.length > 1) {
        const details = makeElement('details', 'email-more-sources');
        details.append(makeElement('summary', '', 'View all ' + row.count + ' occurrences'));
        const list = document.createElement('ul');
        for (const match of row.occurrences) list.append(makeElement('li', '', match.sourceName + ' · Line ' + match.line + ', column ' + match.column + ' · ' + match.matchType));
        details.append(list);
        card.append(details);
      }
      resultsList.append(card);
    }
    const domains = new Map();
    for (const group of groupedMatches) domains.set(group.domain, (domains.get(group.domain) || 0) + 1);
    for (const [domain, count] of [...domains.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
      const chip = makeElement('button', 'email-domain-chip', domain + ' · ' + count);
      chip.type = 'button';
      chip.addEventListener('click', () => { includeDomains.value = domain; excludeDomains.value = ''; domainFilter.value = ''; renderResults(); });
      domainSummary.append(chip);
    }
  }
  function updateStats() {
    const stats = getEmailStats(allMatches);
    uniqueCount.textContent = stats.unique.toLocaleString();
    occurrenceCount.textContent = stats.occurrences.toLocaleString();
    domainCount.textContent = stats.domains.toLocaleString();
    const enabled = hasResults && stats.unique > 0;
    for (const button of [copyButton, txtButton, csvButton, jsonButton, cleanButton]) button.disabled = !enabled;
    renderResults();
  }
  function csvCell(value) {
    let text = String(value ?? '');
    if (/^[=+\-@]/.test(text)) text = "'" + text;
    return '"' + text.replace(/"/g, '""') + '"';
  }
  function downloadFile(fileName, content, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = fileName;
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    window.simpleOnlineToolAnalytics?.trackAction('download');
  }
  async function copyText(value, button) {
    try {
      await navigator.clipboard.writeText(value);
      window.simpleOnlineToolAnalytics?.trackAction('copy');
      const original = button.textContent;
      button.textContent = 'Copied!';
      window.setTimeout(() => { button.textContent = original; }, 1600);
    } catch {
      setError('Clipboard access was unavailable. Select the result text and copy it manually.');
    }
  }
  function getSeparator() { return separatorSelect.value === 'comma' ? ', ' : separatorSelect.value === 'semicolon' ? '; ' : '\n'; }
  function getUniqueEmails() {
    return visibleGroups().map(group => lowercaseOutput.checked ? group.email.toLowerCase() : group.email);
  }
  function getCsv() {
    const groups = visibleGroups();
    const rows = [['email', 'domain', 'occurrences', 'sources', 'line_numbers', 'match_types']];
    for (const group of groups) rows.push([
      group.email, group.domain, group.count,
      [...new Set(group.occurrences.map(match => match.sourceName))].join('; '),
      group.occurrences.map(match => match.line).join('; '),
      [...new Set(group.occurrences.map(match => match.matchType))].join('; ')
    ]);
    return rows.map(row => row.map(csvCell).join(',')).join('\r\n');
  }
  function getJson() {
    const groups = visibleGroups();
    return JSON.stringify({
      uniqueAddressCount: groups.length,
      totalOccurrences: groups.reduce((total, group) => total + group.count, 0),
      addresses: groups.map(group => ({
        email: group.email, domain: group.domain, occurrences: group.count,
        sources: group.occurrences.map(match => ({
          file: match.sourceName, line: match.line, column: match.column,
          matchType: match.matchType, context: match.context
        }))
      }))
    }, null, 2);
  }
  function createCleanedText() {
    return sources.map(source => '--- ' + source.name + ' ---\n' +
      removeEmailMatches(source.text, source.matches, replacementInput.value)).join('\n\n');
  }
  async function extract() {
    setError('');
    const pastedText = input.value;
    if (new TextEncoder().encode(pastedText).length > MAX_TEXT_BYTES) {
      setError('Pasted text exceeds the 5 MB limit. Split it into smaller parts and try again.');
      return;
    }
    const files = Array.from(fileInput.files || []);
    let totalFileBytes = 0;
    for (const file of files) {
      const extension = file.name.includes('.') ? file.name.split('.').pop().toLowerCase() : '';
      if (!SUPPORTED_EXTENSIONS.has(extension)) { setError('Unsupported file: ' + file.name + '. Choose a supported text-based format.'); return; }
      if (file.size > MAX_FILE_BYTES) { setError(file.name + ' exceeds the 5 MB per-file limit.'); return; }
      totalFileBytes += file.size;
    }
    if (totalFileBytes > MAX_TOTAL_FILE_BYTES) { setError('Selected files exceed the 20 MB combined limit. Upload a smaller batch.'); return; }
    if (!pastedText.trim() && files.length === 0) { setError('Paste some text or choose at least one supported file first.'); return; }

    hasResults = false;
    sources = [];
    allMatches = [];
    groupedMatches = [];
    updateStats();
    extractButton.disabled = true;
    extractButton.textContent = 'Extracting…';
    setStatus('Reading supplied content and finding email addresses…');
    try {
      const nextSources = [];
      if (pastedText.trim()) nextSources.push({ name: 'Pasted text', text: prepareSourceText(pastedText), type: 'text' });
      for (const file of files) {
        nextSources.push({ name: file.name, text: prepareSourceText(await file.text(), file.name), type: file.name.split('.').pop().toLowerCase() });
      }
      const nextMatches = [];
      for (const source of nextSources) {
        source.matches = extractEmails(source.text, { includeObfuscated: includeObfuscated.checked })
          .map(match => ({ ...match, sourceName: source.name, sourceType: source.type }));
        nextMatches.push(...source.matches);
      }
      sources = nextSources;
      allMatches = nextMatches;
      groupedMatches = groupEmailMatches(allMatches);
      hasResults = true;
      domainFilter.value = '';
      cleanOutput.value = '';
      copyCleanButton.disabled = true;
      downloadCleanButton.disabled = true;
      updateStats();
      setStatus('Finished: ' + groupedMatches.length.toLocaleString() + ' unique addresses from ' +
        allMatches.length.toLocaleString() + ' matches across ' + sources.length.toLocaleString() + ' source(s).');
      window.simpleOnlineToolAnalytics?.trackComplete('extract');
    } catch {
      setError('A selected file could not be read. Try saving it as a supported text file and upload it again.');
      setStatus('Extraction could not be completed.');
    } finally {
      extractButton.disabled = false;
      extractButton.textContent = 'Extract email addresses';
    }
  }
  function clearAll() {
    input.value = '';
    fileInput.value = '';
    fileList.replaceChildren();
    sources = [];
    allMatches = [];
    groupedMatches = [];
    hasResults = false;
    domainFilter.value = '';
    includeDomains.value = '';
    excludeDomains.value = '';
    separatorSelect.value = 'newline';
    lowercaseOutput.checked = false;
    includeObfuscated.checked = true;
    showOccurrences.checked = false;
    cleanOutput.value = '';
    setError('');
    setStatus('Paste text or choose one or more supported files to begin.');
    uniqueCount.textContent = '0';
    occurrenceCount.textContent = '0';
    domainCount.textContent = '0';
    for (const button of [copyButton, txtButton, csvButton, jsonButton, cleanButton, copyCleanButton, downloadCleanButton]) button.disabled = true;
    renderResults();
    input.focus();
  }

  fileInput.addEventListener('change', renderSelectedFiles);
  extractButton.addEventListener('click', extract);
  clearButton.addEventListener('click', clearAll);
  domainFilter.addEventListener('input', renderResults);
  includeDomains.addEventListener('input', renderResults);
  excludeDomains.addEventListener('input', renderResults);
  sortSelect.addEventListener('change', renderResults);
  showOccurrences.addEventListener('change', renderResults);
  copyButton.addEventListener('click', () => copyText(getUniqueEmails().join(getSeparator()), copyButton));
  txtButton.addEventListener('click', () => downloadFile('extracted-emails.txt', getUniqueEmails().join(getSeparator()), 'text/plain;charset=utf-8'));
  csvButton.addEventListener('click', () => downloadFile('extracted-emails.csv', getCsv(), 'text/csv;charset=utf-8'));
  jsonButton.addEventListener('click', () => downloadFile('extracted-emails.json', getJson(), 'application/json;charset=utf-8'));
  cleanButton.addEventListener('click', () => {
    cleanOutput.value = createCleanedText();
    copyCleanButton.disabled = false;
    downloadCleanButton.disabled = false;
    cleanOutput.focus();
    setStatus('Created a cleaned plain-text copy. Your original content is unchanged.');
  });
  copyCleanButton.addEventListener('click', () => copyText(cleanOutput.value, copyCleanButton));
  downloadCleanButton.addEventListener('click', () => downloadFile('cleaned-text-without-emails.txt', cleanOutput.value, 'text/plain;charset=utf-8'));

  renderSelectedFiles();
  renderResults();
}
