import { Ancestor, Editor, Path, Transforms } from 'slate';
import { ListHotkey, ListType } from './types';
import { isBlockTextEmpty, isFirstChild } from '../queries';
import { isList, isSelectionInList } from './queries';

import { PARAGRAPH } from '../../elements/paragraph';

/**
 * Move a list item next to its parent.
 * The parent should be a list item.
 */
const moveUp = (
  editor: Editor,
  listNode: Ancestor,
  listPath: number[],
  listItemPath: number[]
) => {
  const [listParentNode, listParentPath] = Editor.parent(editor, listPath);
  if (listParentNode.type !== ListType.LIST_ITEM) return;

  const newListItemPath = Path.next(listParentPath);

  // Move item one level up
  Transforms.moveNodes(editor, {
    at: listItemPath,
    to: newListItemPath,
  });

  /**
   * Move the next siblings to a new list
   */
  const listItemIdx = listItemPath[listItemPath.length - 1];
  const siblingPath = [...listItemPath];
  const newListPath = newListItemPath.concat(1);
  let siblingFound = false;
  let newSiblingIdx = 0;
  listNode.children.forEach((n, idx) => {
    if (listItemIdx < idx) {
      if (!siblingFound) {
        siblingFound = true;

        Transforms.insertNodes(
          editor,
          {
            type: listNode.type,
            children: [],
          },
          { at: newListPath }
        );
      }

      siblingPath[siblingPath.length - 1] = listItemIdx;
      const newSiblingsPath = newListPath.concat(newSiblingIdx);
      newSiblingIdx++;
      Transforms.moveNodes(editor, {
        at: siblingPath,
        to: newSiblingsPath,
      });
    }
  });

  // Remove sublist if it was the first list item
  if (!listItemIdx) {
    Transforms.removeNodes(editor, {
      at: listPath,
    });
  }

  return true;
};

const moveDown = (
  editor: Editor,
  listNode: Ancestor,
  listItemPath: number[]
) => {
  // Previous sibling is the new parent
  const previousSiblingItem = Editor.node(editor, Path.previous(listItemPath));

  if (previousSiblingItem) {
    const [previousNode, previousPath] = previousSiblingItem;

    const sublist = previousNode.children.find(isList);
    const newPath = previousPath.concat(
      sublist ? [1, sublist.children.length] : [1]
    );

    if (!sublist) {
      // Create new sublist
      Transforms.wrapNodes(
        editor,
        { type: listNode.type, children: [] },
        { at: listItemPath }
      );
    }

    // Move the current item to the sublist
    Transforms.moveNodes(editor, {
      at: listItemPath,
      to: newPath,
    });
  }
};

export const onKeyDownList = () => (e: KeyboardEvent, editor: Editor) => {
  if (Object.values(ListHotkey).includes(e.key)) {
    if (editor.selection && isSelectionInList(editor)) {
      if (e.key === ListHotkey.TAB) {
        e.preventDefault();
      }

      const [paragraphNode, paragraphPath] = Editor.parent(
        editor,
        editor.selection
      );
      if (paragraphNode.type !== PARAGRAPH) return;
      const [listItemNode, listItemPath] = Editor.parent(editor, paragraphPath);
      if (listItemNode.type !== ListType.LIST_ITEM) return;
      const [listNode, listPath] = Editor.parent(editor, listItemPath);

      if (
        (e.shiftKey && e.key === ListHotkey.TAB) ||
        ([ListHotkey.ENTER, ListHotkey.DELETE_BACKWARD].includes(e.key) &&
          isBlockTextEmpty(paragraphNode))
      ) {
        const moved = moveUp(editor, listNode, listPath, listItemPath);
        if (moved) e.preventDefault();
      }

      if (
        !e.shiftKey &&
        e.key === ListHotkey.TAB &&
        !isFirstChild(listItemPath)
      ) {
        moveDown(editor, listNode, listItemPath);
      }
    }
  }
};
