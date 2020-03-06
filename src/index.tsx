import {
  ACTION_ITEM,
  ActionItemPlugin,
  BLOCKQUOTE,
  BlockquotePlugin,
  BoldPlugin,
  EditablePlugins,
  HeadingPlugin,
  HeadingToolbar,
  HeadingType,
  HoveringToolbar,
  ImagePlugin,
  InlineCodePlugin,
  ItalicPlugin,
  LinkPlugin,
  ListPlugin,
  ListType,
  MARK_BOLD,
  MARK_CODE,
  MARK_ITALIC,
  MARK_STRIKETHROUGH,
  MARK_UNDERLINE,
  MentionPlugin,
  MentionSelect,
  PARAGRAPH,
  ParagraphPlugin,
  SearchHighlightPlugin,
  TablePlugin,
  ToolbarBlock,
  ToolbarImage,
  ToolbarLink,
  ToolbarList,
  ToolbarMark,
  ToolbarSearchHighlight,
  UnderlinePlugin,
  Uploader,
  VideoPlugin,
  decorateSearchHighlight,
  onChangeMention,
  onKeyDownMention,
  useMention,
  withBlock,
  withBreakEmptyReset,
  withDeleteStartReset,
  withImage,
  withLink,
  withList,
  withMention,
  withPasteHtml,
  withShortcuts,
  withTable,
  withVideo,
} from './packages';
import {
  MdCode as Code,
  MdFormatBold as FormatBold,
  MdFormatItalic as FormatItalic,
  MdFormatListBulleted as FormatListBulleted,
  MdFormatListNumbered as FormatListNumbered,
  MdFormatQuote as FormatQuote,
  MdFormatStrikethrough as FormatStrikethrough,
  MdFormatUnderlined as FormatUnderlined,
  MdImage as Image,
  MdLink as Link,
  MdLooks3 as Looks3,
  MdLooks4 as Looks4,
  MdLooks5 as Looks5,
  MdLooksOne as LooksOne,
  MdLooksTwo as LooksTwo,
  MdSearch as Search,
} from 'react-icons/md';
import { Node, createEditor } from 'slate';
import React, { FC, useMemo, useState } from 'react';
import { Slate, withReact } from 'slate-react';

import { withHistory } from 'slate-history';

// import { CHARACTERS } from '../config/data';
// import { boolean } from '@storybook/addon-knobs';



// import {
//   initialValueActionItem,
//   initialValueEmbeds,
//   initialValueImages,
//   initialValueMentions,
//   initialValueRichText,
// } from '../config/initialValues';

const initialValue = [
  {
    type: PARAGRAPH,
    children: [
      {
        text: '',
      },
    ],
  },
];

const resetOptions = {
  types: [ACTION_ITEM, BLOCKQUOTE],
};

const plugins: any[] = [
  BlockquotePlugin(),
  BoldPlugin(),
  ActionItemPlugin(),
  HeadingPlugin(),
  ImagePlugin(),
  InlineCodePlugin(),
  ItalicPlugin(),
  LinkPlugin(),
  ListPlugin(),
  MentionPlugin(),
  ParagraphPlugin(),
  // SearchHighlightPlugin(),
  TablePlugin(),
  UnderlinePlugin(),
  VideoPlugin(),
];

type TypingsProps = {
  uploader?: Uploader
};

const Typings: FC<TypingsProps> = ({ uploader }) => {
  const decorate: any = [];
  const onKeyDown: any = [];

  const [value, setValue] = useState<Node[]>(initialValue);

  const editor = useMemo(
    () =>
      withShortcuts(
        withList(
          withBreakEmptyReset(resetOptions)(
            withDeleteStartReset(resetOptions)(
              withBlock(
                withImage(uploader)(withPasteHtml(plugins)(
                  withLink(withTable(withHistory(withReact(createEditor())))),
                )),
              ),
            ),
          ),
        ),
      ),
    [],
  );

  const [search, setSearchHighlight] = useState('');

  decorate.push(decorateSearchHighlight({ search }));

  // const { target, setTarget, index, setIndex, setSearch, chars } = useMention(
  //   {
  //     characters: CHARACTERS,
  //     maxSuggestions: 10,
  //   },
  // );

  // onKeyDown.push(
  //   onKeyDownMention({
  //     chars,
  //     index,
  //     target,
  //     setIndex,
  //     setTarget,
  //   }),
  // );

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(newValue) => {
        setValue(newValue);

        // onChangeMention({
        //   editor,
        //   setTarget,
        //   setSearch,
        //   setIndex,
        // });
      }}
    >
      {/* <ToolbarSearchHighlight icon={Search} setSearch={setSearchHighlight} /> */}
      <HeadingToolbar>
        <ToolbarBlock format={HeadingType.H1} icon={<LooksOne />} />
        <ToolbarBlock format={HeadingType.H2} icon={<LooksTwo />} />
        <ToolbarBlock format={HeadingType.H3} icon={<Looks3 />} />
        <ToolbarBlock format={HeadingType.H4} icon={<Looks4 />} />
        <ToolbarBlock format={HeadingType.H5} icon={<Looks5 />} />
        <ToolbarMark format={MARK_BOLD} icon={<FormatBold />} />
        <ToolbarMark format={MARK_ITALIC} icon={<FormatItalic />} />
        <ToolbarMark format={MARK_UNDERLINE} icon={<FormatUnderlined />} />
        <ToolbarMark
          format={MARK_STRIKETHROUGH}
          icon={<FormatStrikethrough />}
        />
        <ToolbarMark format={MARK_CODE} icon={<Code />} />
        <ToolbarList format={ListType.UL_LIST} icon={<FormatListBulleted />} />
        <ToolbarList format={ListType.OL_LIST} icon={<FormatListNumbered />} />
        <ToolbarLink icon={<Link />} />
        <ToolbarImage icon={<Image />} />
        <ToolbarBlock format={BLOCKQUOTE} icon={<FormatQuote />} />
      </HeadingToolbar>
      <HoveringToolbar>
        <ToolbarMark reversed format={MARK_BOLD} icon={<FormatBold />} />
        <ToolbarMark reversed format={MARK_ITALIC} icon={<FormatItalic />} />
        <ToolbarMark
          reversed
          format={MARK_UNDERLINE}
          icon={<FormatUnderlined />}
        />
      </HoveringToolbar>
      {/* {target && chars.length > 0 && (
          <MentionSelect target={target} index={index} chars={chars} />
        )} */}
      <EditablePlugins
        plugins={plugins}
        decorate={decorate}
        onKeyDown={onKeyDown}
        placeholder="写点什么..."
      />
    </Slate>
  );
};

export default Typings;
export { Uploader };
