import { useHotkeys } from 'react-hotkeys-hook';
import { useCallback, useEffect, useState } from 'react';

export const cookieVars = {
  dashboard_current_tab: 'DASHBOARD_CURRENT_TAB',
  explorer_current_tab: 'EXPLORER_CURRENT_TAB',
  names_current_tab: 'NAMES_CURRENT_TAB',
  settings_current_tab: 'SETTINGS_CURRENT_TAB',
  support_current_tab: 'SUPPORT_CURRENT_TAB',
  menu_expanded: 'MENU_EXPANDED',
  status_expanded: 'STATUS_EXPANDED',
  help_expanded: 'HELP_EXPANDED',
};

const getSiblings = (e: any) => {
  // for collecting siblings
  let siblings: any[] = [];
  // if no parent, return no sibling
  if (!e.parentNode) {
    return siblings;
  }
  // first child of the parent node
  let sibling = e.parentNode.firstChild;

  // collecting siblings
  while (sibling) {
    if (sibling.nodeType === 1 && sibling !== e) {
      siblings.push(sibling);
    }
    sibling = sibling.nextSibling;
  }
  return siblings;
};

export const useKeyBindings = (expandedRowKeys: readonly React.ReactText[], setExpandedRowKeys: any) => {
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setIsFocused(true);
  }, []);

  const handleOnFocus = useCallback((event) => {
    // Check if the element with querySelector string is
    // in focus, if so, take over the control from here.
    const blurredFrom = event.relatedTarget;
    // const focusedTo = event.target;

    // If the blurredFrom and focusedTo have different parents,
    // then we turn the focused flag on.
    if (blurredFrom === null || blurredFrom.tagName !== 'TR') {
      setIsFocused(true);
    }
  }, []);

  const handleOnBlur = useCallback((event) => {
    const blurredTo = event.relatedTarget;
    // const focusedFrom = event.target;

    // if blurredTo belongs to an element outside the currentDOM tree, then
    // we should mark this element as not-focused
    if (blurredTo === null || blurredTo.tagName !== 'TR') {
      setIsFocused(false);
    }
  }, []);

  // Go to previous row
  const handleUpKey = useCallback(
    (event) => {
      // If activeElement is a TR element or has any of it's parent as TR element, then we must look for next TR element
      if (event.target) {
        // let's check if this itself is a TR element, if not, lets find one
        const currentRow =
          event.target.tagName === 'TR'
            ? event.target
            : event.target.parents?.find((element: HTMLElement) => element.tagName === 'TR') ??
              event.target.querySelector(`tr[data-row-key]`);

        if (currentRow) {
          if (document.activeElement?.isSameNode(currentRow)) {
            // look for previous sibling
            let previousSibling = currentRow.previousElementSibling;
            while (!previousSibling?.getAttribute('data-row-key')) {
              previousSibling = previousSibling.previousElementSibling;
              if (!previousSibling) break;
            }
            previousSibling?.focus();
          } else {
            // highlight itself
            currentRow.focus();
          }
        }
      }
    },
    [isFocused]
  );

  // Go to next row
  const handleDownKey = useCallback(
    (event) => {
      // If activeElement is a TR element or has any of it's parent as TR element, then we must look for next TR element
      if (event.target) {
        // let's check if this itself is a TR element, if not, lets find one
        const currentRow =
          event.target.tagName === 'TR'
            ? event.target
            : event.target.parents?.find((element: HTMLElement) => element.tagName === 'TR') ??
              event.target.querySelector(`tr[data-row-key]`);

        if (currentRow) {
          if (document.activeElement?.isSameNode(currentRow)) {
            // look for next sibling
            let nextSibling = currentRow.nextElementSibling;
            while (!nextSibling?.getAttribute('data-row-key')) {
              nextSibling = nextSibling.nextElementSibling;
              if (!nextSibling) break;
            }
            nextSibling?.focus();
          } else {
            // highlight itself
            currentRow.focus();
          }
        }
      }
    },
    [isFocused]
  );

  const handleEnterKey = useCallback(
    (event) => {
      // If activeElement is a TR element or has any of it's parent as TR element, then we must look for next TR element
      if (isFocused && event.target) {
        // let's check if this itself is a TR element, if not, lets find one
        const currentRow =
          event.target.tagName === 'TR'
            ? event.target
            : event.target.parents?.find((element: HTMLElement) => element.tagName === 'TR') ??
              event.target.querySelector('tr');

        if (currentRow) {
          if (document.activeElement?.isSameNode(currentRow)) {
            const rowKey = currentRow.getAttribute('data-row-key');
            if (expandedRowKeys.find((key) => key === rowKey)) {
              setExpandedRowKeys(expandedRowKeys.filter((keys) => keys !== rowKey));
            } else {
              setExpandedRowKeys(Array.from(new Set([...expandedRowKeys, rowKey])));
            }
          }
        }
      }
    },
    [isFocused, setExpandedRowKeys, expandedRowKeys]
  );

  const handleHomeKey = useCallback(
    (event) => {
      // If activeElement is a TR element or has any of it's parent as TR element, then we must look for next TR element
      if (event.target) {
        // let's check if this itself is a TR element, if not, lets find one
        const currentRow =
          event.target.tagName === 'TR'
            ? event.target
            : event.target.parents?.find((element: HTMLElement) => element.tagName === 'TR') ??
              event.target.querySelector(`tr[data-row-key]`);

        if (currentRow) {
          if (document.activeElement?.isSameNode(currentRow)) {
            // look for previous sibling
            const siblings = getSiblings(currentRow);
            if (siblings && siblings.length > 0) {
              siblings[1].focus();
            }
          } else {
            // highlight itself
            currentRow.focus();
          }
        }
      }
    },
    [isFocused]
  );

  const handleEndKey = useCallback(
    (event) => {
      // If activeElement is a TR element or has any of it's parent as TR element, then we must look for next TR element
      if (event.target) {
        // let's check if this itself is a TR element, if not, lets find one
        const currentRow =
          event.target.tagName === 'TR'
            ? event.target
            : event.target.parents?.find((element: HTMLElement) => element.tagName === 'TR') ??
              event.target.querySelector(`tr[data-row-key]`);

        if (currentRow) {
          if (document.activeElement?.isSameNode(currentRow)) {
            // look for previous sibling
            const siblings = getSiblings(currentRow);
            if (siblings && siblings.length > 0) {
              siblings[siblings.length - 1].focus();
            }
          } else {
            // highlight itself
            currentRow.focus();
          }
        }
      }
    },
    [isFocused]
  );

  useHotkeys('up', handleUpKey, [handleUpKey]);
  useHotkeys('down', handleDownKey, [handleDownKey]);
  useHotkeys('enter', handleEnterKey, [handleEnterKey]);
  useHotkeys(',, home', handleHomeKey, [handleHomeKey]);
  useHotkeys('., end', handleEndKey, [handleEndKey]);

  return {
    handleOnFocus,
    handleOnBlur,
  };
};

export function triggerFocus(element: any) {
  var eventType = 'onfocusin' in element ? 'focusin' : 'focus',
    bubbles = 'onfocusin' in element,
    event;

  if ('createEvent' in document) {
    event = document.createEvent('Event');
    event.initEvent(eventType, bubbles, true);
  } else if ('Event' in window) {
    event = new Event(eventType, { bubbles: bubbles, cancelable: true });
  }

  element.focus();
  element.dispatchEvent(event);
}
