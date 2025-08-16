import React, { useEffect, useMemo, useRef, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';

const DEFAULT_CODE = `// Welcome to Codify Playground!\n// Write JavaScript here and click Run.\n\nfunction greet(name) {\n  return \`Hello, \${name}!\`;\n}\n\nconst message = greet('Codify');\nconsole.log(message);\n\n// Try editing the code above or use console.log to print results.\n`;

function createSandboxHtml() {
  return `<!doctype html>\n<html><head><meta charset="utf-8"><style>html,body{margin:0;padding:8px;font-family:ui-sans-serif,system-ui,-apple-system;}</style></head>\n<body>\n<pre id="output" style="white-space:pre-wrap"></pre>\n<script>\n(function(){\n  const outputEl = document.getElementById('output');\n  const write = (msg, type='log') => {\n    const line = document.createElement('div');\n    line.textContent = msg;\n    if(type==='error'){ line.style.color = '#ef4444'; }\n    outputEl.appendChild(line);\n  };\n  const log = (...args) => {\n    try { parent.postMessage({ type:'playground-log', payload: args.map(a=>{ try{return JSON.stringify(a);}catch(e){return String(a);} }) }, '*'); } catch(e){}\n    write(args.map(a=>{ try{return typeof a==='object'? JSON.stringify(a): String(a);}catch(e){return String(a);} }).join(' '));\n  };\n  console.log = log;\n  console.error = (...args)=>{ log(...args); };\n  console.warn = (...args)=>{ log(...args); };\n  window.addEventListener('message', (ev)=>{\n    if(!ev || !ev.data) return;\n    if(ev.data.type === 'run-code'){\n      outputEl.textContent = '';\n      try {\n        const fn = new Function(ev.data.code);\n        const result = fn();\n        if(result !== undefined){ log(result); }\n      } catch(err){\n        write(String(err), 'error');\n      }\n    }\n  });\n})();\n</script>\n</body></html>`;
}

const CodePlayground = ({ initialCode = DEFAULT_CODE, isDark = false }) => {
  const [code, setCode] = useState(initialCode);
  const iframeRef = useRef(null);
  const sandboxUrl = useMemo(() => {
    const html = createSandboxHtml();
    const blob = new Blob([html], { type: 'text/html' });
    return URL.createObjectURL(blob);
  }, []);

  useEffect(() => {
    return () => {
      if (sandboxUrl) URL.revokeObjectURL(sandboxUrl);
    };
  }, [sandboxUrl]);

  const runCode = () => {
    const iframe = iframeRef.current;
    if (!iframe || !iframe.contentWindow) return;
    // Reset by reloading to clear previous state
    iframe.src = sandboxUrl;
    const send = () => {
      iframe.contentWindow.postMessage({ type: 'run-code', code }, '*');
    };
    // Give the iframe a tick to load
    setTimeout(send, 50);
  };

  return (
    <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className={`${isDark ? 'bg-[#0b0f17]' : 'bg-white'} p-2`}> 
          <div className="flex items-center justify-between pb-2">
            <h3 className="text-sm font-semibold">Editor</h3>
            <button onClick={runCode} className="px-3 py-1.5 rounded-md bg-primary text-white text-sm hover:bg-primary-dark">Run ▶</button>
          </div>
          <CodeMirror
            value={code}
            height="400px"
            theme={isDark ? oneDark : undefined}
            extensions={[javascript({ jsx: true })]}
            basicSetup={{ lineNumbers: true }}
            onChange={(val) => setCode(val)}
          />
        </div>
        <div className={`${isDark ? 'bg-dark-bg-secondary' : 'bg-light-bg-secondary'} p-2`}> 
          <h3 className="text-sm font-semibold pb-2">Output</h3>
          <iframe
            ref={iframeRef}
            title="playground-sandbox"
            className="w-full h-[400px] rounded border border-gray-200 dark:border-gray-700 bg-white"
            sandbox="allow-scripts"
            src={sandboxUrl}
          />
        </div>
      </div>
    </div>
  );
};

export default CodePlayground;


