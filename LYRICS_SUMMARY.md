# NewMyMusic 歌词功能 - 快速总结

## 文件位置总览

| 功能 | 文件位置 |
|------|---------|
| API接口 | src/api/lyrics.ts |
| 歌词组件 | src/components/Lyrics/index.tsx |
| 歌词样式 | src/components/Lyrics/index.less |
| 歌词设置 | src/pages/Set/SetLyrics/index.tsx |
| 全局状态 | src/store/store.ts |
| 播放控制条 | src/components/Bottom/LyricsButtom/index.tsx |
| 歌词按钮 | src/components/Bottom/RightControlButtons/index.tsx |

## 核心工作流程

1. **用户点击歌词按钮** → setShowLyrics(true)
2. **Lyrics组件挂载** → 搜索歌曲 → 获取歌词URL → 加载歌词内容
3. **监听播放进度** → 计算高亮行索引
4. **CSS动画** → 缩放(0.95→1) + 透明度(0.28→0.98)
5. **自动滚动** → scrollIntoView({ smooth, center })

## 进度同步算法

```
高亮行索引 = floor(当前进度ms / 总时长ms * 总行数)
```

例: 播放50% + 100行歌词 = 高亮第50行

## 关键技术

| 技术 | 用途 |
|------|------|
| Jotai Atoms | 全局状态管理 |
| React Query | 数据缓存(5分钟) |
| Happi.dev API | 歌词数据源 |
| CSS Transform | 缩放动画(GPU加速) |
| scrollIntoView | 自动滚动 |

## 状态管理 (Jotai Atoms)

```typescript
ShowLyrics          // 是否显示歌词页面
PlayerDemo          // 播放进度信息
CurrentSongList     // 当前播放列表
CountDemo           // 当前歌曲索引
SetDemo             // 配置(字体大小、背景等)
```

## API数据源

**Happi.dev API**
- 搜索: `/music?q=歌曲名&limit=10`
- 获取: `https://api.happi.dev/v1/lyrics?lyrics_id=...`

响应格式:
```json
{
  "result": {
    "lyrics": "Line1\nLine2\n...",
    "api_lyrics": "URL to lyrics"
  }
}
```

## 样式三大核心

### 1. 高亮动画
```css
.highlight .content {
  transform: scale(1);
  opacity: 0.98;
}
```

### 2. 背景模式 (4种)
- 'false': 无背景
- 'true': 随机渐变
- 'blur': 模糊封面
- 'dynamic': 360度旋转

### 3. 滚动条隐藏
```css
scrollbar-width: none;
::-webkit-scrollbar { display: none; }
```

## 设置项 (4个)

1. 显示翻译 (boolean) → setDemo.showTranslate
2. 背景模式 (string) → setDemo.showBackGround
3. 显示时间 (boolean) → setDemo.currentTime
4. 字体大小 (string) → setDemo.songFontSize

## 性能优化

- React Query缓存: 5分钟
- 条件查询: enabled字段
- 状态更新: 仅在索引改变时
- CSS动画: transform和opacity(GPU)

## 常见问题

Q: 为什么要两次API调用?
A: 搜索返回URL，再用URL获取歌词。这样可以灵活支持多个数据源。

Q: 歌词为何有2行偏移?
A: 前两行是"作曲"和"作词"，所以line0、line1保留，歌词从line2开始。

Q: 如何实现平滑滚动?
A: scrollIntoView({ behavior: 'smooth', block: 'center' })

Q: 缩放动画从哪里来?
A: CSS transform: scale(0.95) → scale(1)，在.highlight时触发

## 扩展建议

1. 支持本地.lrc文件上传
2. 集成多个歌词源(QQ、网易云)
3. 虚拟滚动处理大量歌词
4. 歌词搜索和跳转功能
5. 用户歌词贡献系统
