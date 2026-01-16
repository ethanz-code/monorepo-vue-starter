import type { ParserPreset, UserConfig } from '@commitlint/types';
import config from '@commitlint/config-conventional';
import createPreset from 'conventional-changelog-conventionalcommits';
import { merge } from 'lodash-es';

// 创建自定义 emoji 解析器
async function createEmojiParser(): Promise<ParserPreset> {
  // 从配置中生成 emoji 正则
  const emojiRegexPart = Object.values(config.prompt.questions.type.enum)
    .map((value) => value.emoji.trim())
    .join('|');

  const parserOpts = {
    breakingHeaderPattern: new RegExp(`^(?:${emojiRegexPart})\\s+(\\w*)(?:\\((.*)\\))?!:\\s+(.*)$`),
    headerPattern: new RegExp(`^(?:${emojiRegexPart})\\s+(\\w*)(?:\\((.*)\\))?!?:\\s+(.*)$`),
  };

  const emojiParser = merge({}, await createPreset(), {
    conventionalChangelog: { parserOpts },
    parserOpts,
    recommendedBumpOpts: { parserOpts },
  });

  return emojiParser;
}

const emojiParser = await createEmojiParser();

export default {
  extends: ['@commitlint/config-conventional'],
  parserPreset: emojiParser,
  prompt: {
    settings: {
      enableMultipleScopes: false,
      scopeEnumSeparator: ',',
    },
    messages: {
      skip: '（按回车跳过）',
      max: '最多 %d 个字符',
      min: '至少 %d 个字符',
      emptyWarning: '不能为空',
      upperLimitWarning: '超过字数限制',
      lowerLimitWarning: '低于字数限制',
    },
    questions: {
      type: {
        description: '选择你要提交的变更类型：',
        enum: {
          feat: {
            description: '新功能',
            title: 'Features',
            emoji: '✨ ',
          },
          fix: {
            description: '修复 bug',
            title: 'Bug Fixes',
            emoji: '🐛 ',
          },
          docs: {
            description: '仅文档更新',
            title: 'Documentation',
            emoji: '📚 ',
          },
          style: {
            description: '不影响代码含义的更改（空格、格式化、缺少分号等）',
            title: 'Styles',
            emoji: '💎 ',
          },
          refactor: {
            description: '既不修复 bug 也不添加功能的代码更改',
            title: 'Code Refactoring',
            emoji: '📦 ',
          },
          perf: {
            description: '提升性能的代码更改',
            title: 'Performance Improvements',
            emoji: '🚀 ',
          },
          test: {
            description: '添加缺失的测试或修正现有测试',
            title: 'Tests',
            emoji: '🚨 ',
          },
          build: {
            description: '影响构建系统或外部依赖的更改',
            title: 'Builds',
            emoji: '🛠️ ',
          },
          ci: {
            description: 'CI 配置文件和脚本的更改',
            title: 'Continuous Integrations',
            emoji: '⚙️ ',
          },
          chore: {
            description: '其他不修改 src 或 test 文件的更改',
            title: 'Chores',
            emoji: '♻️ ',
          },
          revert: {
            description: '回滚之前的提交',
            title: 'Reverts',
            emoji: '🗑️ ',
          },
        },
        emojiInHeader: true,
      },
      scope: {
        description: '此次更改的范围是什么（例如组件或文件名）',
      },
      subject: {
        description: '写一个简短的变更描述',
      },
      body: {
        description: '提供更详细的变更描述',
      },
      isBreaking: {
        description: '是否有破坏性变更？',
      },
      breakingBody: {
        description: '破坏性变更的提交需要 body，请输入更详细的描述',
      },
      breaking: {
        description: '描述破坏性变更的内容',
      },
      isIssueAffected: {
        description: '此次变更是否影响某个 issue？',
      },
      issuesBody: {
        description: '如果关闭了 issue，提交需要 body，请输入更详细的描述',
      },
      issues: {
        description: '添加 issue 引用（例如 "fix #123", "re #123"）',
      },
    },
  },
} satisfies UserConfig;
