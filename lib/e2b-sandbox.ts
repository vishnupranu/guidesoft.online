import { CodeInterpreter, Result } from '@e2b/code-interpreter'

export class E2BSandbox {
  private isInitialized = false;
  private sandbox: CodeInterpreter | null = null;

  async initialize() {
    console.log('[E2B Sandbox] Connecting to secure microVM...');
    if (process.env.E2B_API_KEY) {
      try {
        this.sandbox = await CodeInterpreter.create({ apiKey: process.env.E2B_API_KEY });
        this.isInitialized = true;
        console.log('[E2B Sandbox] Connected successfully to E2B Code Interpreter.');
        return true;
      } catch (e) {
        console.error('[E2B Sandbox] Failed to initialize E2B Sandbox:', e);
      }
    } else {
      console.warn('[E2B Sandbox] E2B_API_KEY not found. Operating in mock mode.');
      this.isInitialized = true; // Fallback mock initialization
    }
    return true;
  }

  async runCode(language: 'python' | 'js', code: string) {
    if (!this.isInitialized) {
      throw new Error("Sandbox not initialized. Call initialize() first.");
    }
    
    console.log(`[E2B Sandbox] Executing ${language} code securely...`);
    
    if (this.sandbox) {
      try {
        const execution = await this.sandbox.notebook.execCell(code);
        return {
          stdout: execution.logs.stdout.join('\n'),
          stderr: execution.logs.stderr.join('\n'),
          error: execution.error ? execution.error.value : null
        };
      } catch (e: any) {
        console.error('[E2B Sandbox] Execution error:', e);
        return { stdout: '', stderr: e.message || 'Unknown error', error: e };
      }
    }

    // Mock successful execution
    return {
      stdout: 'Mocked standard output execution result',
      stderr: '',
      error: null
    };
  }

  async close() {
    console.log('[E2B Sandbox] Terminating secure microVM...');
    if (this.sandbox) {
      await this.sandbox.close();
      this.sandbox = null;
    }
    this.isInitialized = false;
  }
}
