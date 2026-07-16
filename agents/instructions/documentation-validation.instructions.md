---
applyTo: "README.md,agents/**/*.md,src/**/*"
---

# 文档与验证规则

1. 正式文字先读取 `agents/WRITING_STYLE.md`。
2. README、changelog、agent 管理文件、instructions、prompts、设计说明、用户侧机制说明、UI 正式文案和提交说明都属于正式文字。
3. 只简洁陈述项目内容和意定的使用方法，不写非 prompt 的建议、应用语境假设、防御性补丁说明或来源注解。
4. 文档中只使用项目内相对路径，不暴露本机绝对路径、项目外路径或与项目交付无关的本地环境位置。
5. 用户侧机制变化同步 README 和 changelog。
6. changelog 描述保持简洁；不自行新建版本，不自行更新版本号。
7. 代码修改使用 `pnpm lint`、`pnpm typecheck`、`pnpm build`。
