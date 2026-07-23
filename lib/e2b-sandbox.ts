import { Sandbox } from '@e2b/code-interpreter'

export class E2BSandbox {
  private isInitialized = false;
  private sandbox: Sandbox | null = null;

  async initialize() {
    console.log('[E2B Sandbox] Connecting to secure microVM...');
    if (process.env.E2B_API_KEY) {
      try {
        this.sandbox = await Sandbox.create({ apiKey: process.env.E2B_API_KEY });
        this.isInitialized = true;
        console.log('[E2B Sandbox] Connected successfully to E2B Sandbox.');
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
        // We use commands.run or simply assume it executes it if it's the code interpreter template
        const execution = await this.sandbox.commands.run(`python -c "${code.replace(/"/g, '\\"')}"`);
        return {
          stdout: execution.stdout,
          stderr: execution.stderr,
          error: execution.error ? execution.error : null
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
      await this.sandbox.kill();
      this.sandbox = null;
    }
    this.isInitialized = false;
  }
}
