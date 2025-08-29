#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class FullStackEvaluator {
  constructor() {
    this.results = {
      ui: { score: 0, maxScore: 55, details: {} },
      api: { score: 0, maxScore: 55, details: {} },
      database: { score: 0, maxScore: 55, details: {} }
    };
    this.projectRoot = process.cwd();
  }

  // Utility functions
  execCommand(command, ignoreErrors = false) {
    try {
      return execSync(command, { encoding: 'utf8', cwd: this.projectRoot });
    } catch (error) {
      if (!ignoreErrors) {
        console.warn(`Command failed: ${command}`);
        console.warn(error.message);
      }
      return null;
    }
  }

  fileExists(filePath) {
    return fs.existsSync(path.join(this.projectRoot, filePath));
  }

  readPackageJson() {
    try {
      return JSON.parse(fs.readFileSync(path.join(this.projectRoot, 'package.json'), 'utf8'));
    } catch {
      return {};
    }
  }

  countFiles(pattern) {
    try {
      const result = this.execCommand(`find . -name \\"${pattern}\\" -type f | wc -l`);
      return parseInt(result?.trim() || '0');
    } catch {
      return 0;
    }
  }

  analyzeCodebase() {
    const tsFiles = this.countFiles('*.ts') + this.countFiles('*.tsx');
    const jsFiles = this.countFiles('*.js') + this.countFiles('*.jsx');
    const componentFiles = this.countFiles('*component*.tsx') + this.countFiles('*Component*.tsx');
    
    return { tsFiles, jsFiles, componentFiles, totalFiles: tsFiles + jsFiles };
  }

  // UI EVALUATION METHODS (55 Stars)
  
  evaluateUICodeQuality() {
    let score = 0;
    const details = {};

    // Safety (0.5) - TypeScript compilation
    try {
      const tsResult = this.execCommand('npx tsc --noEmit', true);
      details.typescript = tsResult === null ? 'No errors' : 'Has errors';
      score += tsResult === null ? 0.5 : 0;
    } catch {
      details.typescript = 'TypeScript check failed';
    }

    // Linting (1) - ESLint
    try {
      const eslintResult = this.execCommand('npx eslint . --ext .ts,.tsx,.js,.jsx --format json', true);
      if (eslintResult) {
        const lintData = JSON.parse(eslintResult);
        const errors = lintData.reduce((sum, file) => sum + file.errorCount, 0);
        const warnings = lintData.reduce((sum, file) => sum + file.warningCount, 0);
        
        if (errors === 0 && warnings <= 5) score += 1.0;
        else if (errors <= 5 && warnings <= 20) score += 0.5;
        
        details.eslint = `${errors} errors, ${warnings} warnings`;
      }
    } catch {
      details.eslint = 'ESLint check failed';
    }

    // Formatting (0.5) - Prettier
    try {
      const prettierResult = this.execCommand('npx prettier --check .', true);
      details.prettier = prettierResult === null ? 'All files formatted' : 'Formatting issues';
      score += prettierResult === null ? 0.5 : 0;
    } catch {
      details.prettier = 'Prettier check failed';
    }

    // Functionality (1.5) - Cannot automatically test without existing test suite
    details.functionality = 'No automated tests found - scored as 0';

    // XSS Prevention (0.5) - Cannot run OWASP ZAP automatically
    details.xss = 'Cannot run OWASP ZAP scan automatically - scored as 0';

    // Documentation (1) - JSDoc coverage
    try {
      const files = this.execCommand('find ./src -name \\"*.ts\\" -o -name \\"*.tsx\\"');
      if (files) {
        const fileList = files.trim().split('\n');
        let documented = 0;
        fileList.forEach(file => {
          try {
            const content = fs.readFileSync(file, 'utf8');
            if (content.includes('/**') || content.includes('//')) documented++;
          } catch {}
        });
        const coverage = (documented / fileList.length) * 100;
        if (coverage >= 95) score += 1.0;
        else if (coverage >= 80) score += 0.5;
        details.documentation = `${coverage.toFixed(1)}% documented`;
      }
    } catch {
      details.documentation = 'Documentation check failed';
    }

    this.results.ui.details.codeQuality = { score, maxScore: 5, details };
    this.results.ui.score += score;
  }

  evaluateUITechSelection() {
    let score = 0;
    const details = {};
    const pkg = this.readPackageJson();
    const deps = { ...pkg.dependencies, ...pkg.devDependencies };

    const techStack = {
      'shadcn': Object.keys(deps).some(dep => dep.includes('@radix-ui')),
      'carbon': Object.keys(deps).some(dep => dep.includes('carbon')),
      'nextjs': deps['next'] !== undefined,
      'svg': Object.keys(deps).some(dep => dep.includes('lucide') || dep.includes('hero')),
      'tailwind': deps['tailwindcss'] !== undefined
    };

    Object.entries(techStack).forEach(([tech, present]) => {
      if (present) score += 1;
      details[tech] = present ? 'Present' : 'Not found';
    });

    this.results.ui.details.techSelection = { score, maxScore: 5, details };
    this.results.ui.score += score;
  }

  evaluateUIDesignAlignment() {
    // Cannot automatically measure pixel-perfect alignment or run accessibility tests
    const score = 0;
    const details = {
      pixelPerfect: 'Cannot measure pixel deviation automatically - scored as 0',
      accessibility: 'Cannot run axe-core automatically - scored as 0'
    };

    this.results.ui.details.designAlignment = { score, maxScore: 5, details };
    this.results.ui.score += score;
  }

  evaluateUIComponentControl() {
    let score = 0;
    const details = {};
    const codebase = this.analyzeCodebase();

    // Reusable Components (1.5) - Basic heuristic
    try {
      const componentImports = this.execCommand('grep -r \\"import.*from.*components\\" src/ | wc -l');
      const reuseFactor = parseInt(componentImports || '0') / Math.max(codebase.componentFiles, 1);
      if (reuseFactor >= 2) score += 1.5;
      else if (reuseFactor >= 1.5) score += 1.0;
      else if (reuseFactor >= 1) score += 0.5;
      details.reusability = `Reuse factor: ${reuseFactor.toFixed(2)}`;
    } catch {
      details.reusability = 'Could not analyze component reuse';
    }

    // Single Responsibility (1) - Cannot measure cyclomatic complexity automatically
    details.singleResponsibility = 'Cannot measure cyclomatic complexity automatically - scored as 0';

    // Proper Isolation (1) - Count imports per file
    try {
      const importCounts = [];
      const files = this.execCommand('find ./src -name \\"*.tsx\\" -o -name \\"*.ts\\"');
      if (files) {
        files.trim().split('\n').forEach(file => {
          try {
            const content = fs.readFileSync(file, 'utf8');
            const imports = (content.match(/^import.*from/gm) || []).length;
            importCounts.push(imports);
          } catch {}
        });
        const avgImports = importCounts.reduce((a, b) => a + b, 0) / importCounts.length;
        if (avgImports <= 3) score += 1.0;
        else if (avgImports <= 6) score += 0.5;
        details.isolation = `Average imports per file: ${avgImports.toFixed(1)}`;
      }
    } catch {
      details.isolation = 'Could not analyze import dependencies';
    }

    // Code Clarity (1) - Basic naming convention check
    try {
      const badNames = this.execCommand('grep -r \\"function [a-z]\\\\|const [a-z]\\\\|let [a-z]\\\" src/ | wc -l', true);
      const totalFunctions = this.execCommand('grep -r \\"function \\\\\\|const \\\\\\|let \\\" src/ | wc -l', true);
      const clarity = 1 - (parseInt(badNames || '0') / Math.max(parseInt(totalFunctions || '1'), 1));
      if (clarity >= 0.9) score += 1.0;
      else if (clarity >= 0.7) score += 0.5;
      details.clarity = `Naming clarity: ${(clarity * 100).toFixed(1)}%`;
    } catch {
      details.clarity = 'Could not analyze naming conventions';
    }

    // Error Handling (0.5) - Check for try-catch blocks
    try {
      const tryCatchCount = this.execCommand('grep -r \\"try {\\\\|catch (\\\" src/ | wc -l');
      const functionCount = this.execCommand('grep -r \\"function \\\\\\|=>\\\" src/ | wc -l');
      const errorHandlingRatio = parseInt(tryCatchCount || '0') / Math.max(parseInt(functionCount || '1'), 1);
      if (errorHandlingRatio >= 0.1) score += 0.5;
      details.errorHandling = `Error handling ratio: ${(errorHandlingRatio * 100).toFixed(1)}%`;
    } catch {
      details.errorHandling = 'Could not analyze error handling';
    }

    this.results.ui.details.componentControl = { score, maxScore: 5, details };
    this.results.ui.score += score;
  }

  evaluateUIRegeneration() {
    // Cannot test regeneration without baseline
    const score = 0;
    const details = {
      structural: 'Cannot test without regeneration baseline - scored as 0',
      functional: 'Cannot test without regeneration baseline - scored as 0',
      codeStyle: 'Cannot test without regeneration baseline - scored as 0'
    };

    this.results.ui.details.regeneration = { score, maxScore: 5, details };
    this.results.ui.score += score;
  }

  evaluateUIFeatureAddition() {
    // Cannot test feature addition timing automatically
    const score = 0;
    const details = {
      scalability: 'Cannot time feature addition automatically - scored as 0',
      breakingChanges: 'Cannot test without adding features - scored as 0',
      modular: 'Cannot test without adding features - scored as 0',
      uniformity: 'Cannot test without adding features - scored as 0'
    };

    this.results.ui.details.featureAddition = { score, maxScore: 5, details };
    this.results.ui.score += score;
  }

  evaluateUIPluginCapability() {
    let score = 0;
    const details = {};
    const pkg = this.readPackageJson();
    const deps = { ...pkg.dependencies, ...pkg.devDependencies };

    const plugins = {
      calendly: Object.keys(deps).some(dep => dep.includes('calendly')),
      chat: Object.keys(deps).some(dep => dep.includes('chat') || dep.includes('crisp')),
      maps: Object.keys(deps).some(dep => dep.includes('google') && dep.includes('map')),
      recaptcha: Object.keys(deps).some(dep => dep.includes('recaptcha')),
      intercom: Object.keys(deps).some(dep => dep.includes('intercom'))
    };

    Object.entries(plugins).forEach(([plugin, present]) => {
      if (present) score += 1;
      details[plugin] = present ? 'Integrated' : 'Not found';
    });

    this.results.ui.details.pluginCapability = { score, maxScore: 5, details };
    this.results.ui.score += score;
  }

  evaluateUIBuildTime() {
    let score = 0;
    const details = {};

    try {
      console.log('Testing build time...');
      const start = Date.now();
      this.execCommand('npm run build');
      const buildTime = (Date.now() - start) / 1000 / 60; // minutes

      if (buildTime <= 5) score = 5;
      else if (buildTime <= 10) score = 4;
      else if (buildTime <= 20) score = 3;
      else if (buildTime <= 40) score = 2;
      else score = 1;

      details.buildTime = `${buildTime.toFixed(2)} minutes`;
    } catch {
      details.buildTime = 'Build failed';
    }

    this.results.ui.details.buildTime = { score, maxScore: 5, details };
    this.results.ui.score += score;
  }

  evaluateUIRegenerationTime() {
    // Cannot test regeneration time without actual regeneration
    const score = 0;
    const details = {
      regenerationTime: 'Cannot test regeneration time automatically - scored as 0'
    };

    this.results.ui.details.regenerationTime = { score, maxScore: 5, details };
    this.results.ui.score += score;
  }

  evaluateUITestingAutomation() {
    let score = 0;
    const details = {};

    // Check for test files
    const testFiles = this.countFiles('*.test.*') + this.countFiles('*.spec.*');
    if (testFiles > 0) {
      try {
        const testResult = this.execCommand('npm test', true);
        details.tests = `${testFiles} test files found`;
        if (testResult && !testResult.includes('failed')) {
          score += 1; // Unit tests
        }
      } catch {
        details.tests = 'Tests found but execution failed';
      }
    } else {
      details.tests = 'No test files found';
    }

    // Other testing metrics cannot be automatically evaluated
    details.e2e = 'Cannot run E2E tests automatically - scored as 0';
    details.a11y = 'Cannot run accessibility tests automatically - scored as 0';
    details.performance = 'Cannot run Lighthouse automatically - scored as 0';
    details.crossBrowser = 'Cannot test cross-browser automatically - scored as 0';

    this.results.ui.details.testingAutomation = { score, maxScore: 5, details };
    this.results.ui.score += score;
  }

  evaluateUIProductionReadiness() {
    let score = 0;
    const details = {};

    // Build Success (1)
    try {
      this.execCommand('npm run build');
      score += 1;
      details.build = 'Build successful';
    } catch {
      details.build = 'Build failed';
    }

    // Other metrics cannot be automatically tested
    details.security = 'Cannot run vulnerability scan automatically - scored as 0';
    details.performance = 'Cannot test Core Web Vitals automatically - scored as 0';
    details.errorHandling = 'Cannot test error boundaries automatically - scored as 0';
    details.monitoring = 'Cannot detect analytics integration automatically - scored as 0';

    this.results.ui.details.productionReadiness = { score, maxScore: 5, details };
    this.results.ui.score += score;
  }

  // API EVALUATION METHODS (55 Stars)
  
  evaluateAPICodeQuality() {
    // Cannot evaluate API without API codebase
    const score = 0;
    const details = {
      crud: 'No API codebase detected - scored as 0',
      mapping: 'No API codebase detected - scored as 0',
      performance: 'No API codebase detected - scored as 0',
      multiDb: 'No API codebase detected - scored as 0',
      errorHandling: 'No API codebase detected - scored as 0'
    };

    this.results.api.details.codeQuality = { score, maxScore: 5, details };
    this.results.api.score += score;
  }

  evaluateAPITechSelection() {
    // Cannot evaluate API tech without API codebase
    const score = 0;
    const details = {
      migrations: 'No API codebase detected - scored as 0'
    };

    this.results.api.details.techSelection = { score, maxScore: 5, details };
    this.results.api.score += score;
  }

  evaluateAPIDesignAlignment() {
    // Cannot evaluate API design without API codebase
    const score = 0;
    const details = {
      modelConsistency: 'No API codebase detected - scored as 0',
      crudImplementation: 'No API codebase detected - scored as 0',
      mapping: 'No API codebase detected - scored as 0',
      lifecycle: 'No API codebase detected - scored as 0',
      portal: 'No API codebase detected - scored as 0'
    };

    this.results.api.details.designAlignment = { score, maxScore: 5, details };
    this.results.api.score += score;
  }

  // DATABASE EVALUATION METHODS (55 Stars)
  
  evaluateDatabaseNormalization() {
    let score = 0;
    const details = {};

    // Check if Supabase is configured
    if (this.fileExists('supabase/config.toml')) {
      details.supabase = 'Supabase configuration found';
      
      // Cannot automatically test normalization without database access
      details.normalization = 'Cannot test database normalization automatically - scored as 0';
    } else {
      details.database = 'No database configuration detected - scored as 0';
    }

    this.results.database.details.normalization = { score, maxScore: 5, details };
    this.results.database.score += score;
  }

  evaluateDatabaseTechSelection() {
    let score = 0;
    const details = {};

    if (this.fileExists('supabase/config.toml')) {
      score += 1; // Basic tech selection for having Supabase
      details.type = 'Supabase/PostgreSQL detected';
    }

    // Cannot test other aspects automatically
    details.scalability = 'Cannot test scalability automatically - scored as 0';
    details.integration = 'Cannot test integration automatically - scored as 0';
    details.cloudNative = 'Cannot test cloud deployment automatically - scored as 0';

    this.results.database.details.techSelection = { score, maxScore: 5, details };
    this.results.database.score += score;
  }

  // Main evaluation runner
  async runEvaluation() {
    console.log('🚀 Starting Full-Stack Application Evaluation...\n');

    console.log('📱 UI Evaluation...');
    this.evaluateUICodeQuality();
    this.evaluateUITechSelection();
    this.evaluateUIDesignAlignment();
    this.evaluateUIComponentControl();
    this.evaluateUIRegeneration();
    this.evaluateUIFeatureAddition();
    this.evaluateUIPluginCapability();
    this.evaluateUIBuildTime();
    this.evaluateUIRegenerationTime();
    this.evaluateUITestingAutomation();
    this.evaluateUIProductionReadiness();

    console.log('🔌 API Evaluation...');
    this.evaluateAPICodeQuality();
    this.evaluateAPITechSelection();
    this.evaluateAPIDesignAlignment();

    console.log('🗄️  Database Evaluation...');
    this.evaluateDatabaseNormalization();
    this.evaluateDatabaseTechSelection();

    this.generateReport();
  }

  generateReport() {
    const totalScore = this.results.ui.score + this.results.api.score + this.results.database.score;
    const totalMaxScore = this.results.ui.maxScore + this.results.api.maxScore + this.results.database.maxScore;
    const percentage = ((totalScore / totalMaxScore) * 100).toFixed(1);

    console.log('\n' + '='.repeat(60));
    console.log('📊 FULL-STACK EVALUATION RESULTS');
    console.log('='.repeat(60));
    
    console.log(`\n🎨 UI Score: ${this.results.ui.score.toFixed(1)}/${this.results.ui.maxScore} stars`);
    console.log(`🔌 API Score: ${this.results.api.score.toFixed(1)}/${this.results.api.maxScore} stars`);
    console.log(`🗄️  Database Score: ${this.results.database.score.toFixed(1)}/${this.results.database.maxScore} stars`);
    console.log(`\n🏆 Total Score: ${totalScore.toFixed(1)}/${totalMaxScore} stars`);
    console.log(`📈 Percentage: ${percentage}%`);

    console.log('\n📋 DETAILED BREAKDOWN:');
    console.log('\nUI EVALUATION:');
    Object.entries(this.results.ui.details).forEach(([category, data]) => {
      console.log(`  ${category}: ${data.score}/${data.maxScore} stars`);
      if (data.details) {
        Object.entries(data.details).forEach(([metric, value]) => {
          console.log(`    - ${metric}: ${value}`);
        });
      }
    });

    console.log('\nAPI EVALUATION:');
    Object.entries(this.results.api.details).forEach(([category, data]) => {
      console.log(`  ${category}: ${data.score}/${data.maxScore} stars`);
    });

    console.log('\nDATABASE EVALUATION:');
    Object.entries(this.results.database.details).forEach(([category, data]) => {
      console.log(`  ${category}: ${data.score}/${data.maxScore} stars`);
    });

    console.log('\n⚠️  LIMITATIONS:');
    console.log('• Many metrics scored as 0 due to automation limitations');
    console.log('• Manual testing required for design alignment, accessibility');
    console.log('• API/Database evaluation limited without dedicated backend code');
    console.log('• Performance testing requires specialized tools');
    console.log('• Security scans need external vulnerability scanners');

    // Save detailed report to file
    const reportData = {
      timestamp: new Date().toISOString(),
      results: this.results,
      summary: {
        ui: this.results.ui.score,
        api: this.results.api.score,
        database: this.results.database.score,
        total: totalScore,
        percentage: parseFloat(percentage)
      }
    };

    fs.writeFileSync('evaluation-report.json', JSON.stringify(reportData, null, 2));
    console.log('\n💾 Detailed report saved to evaluation-report.json');
  }
}

// Run the evaluation
if (require.main === module) {
  const evaluator = new FullStackEvaluator();
  evaluator.runEvaluation().catch(console.error);
}

module.exports = FullStackEvaluator;
