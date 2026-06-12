// Minimaler Renderer für Storyblok Richtext-JSON -> HTML-String.
// Bewusst ohne externe Abhängigkeit (storyblok-js-client liefert je nach
// Version keinen funktionierenden RichTextResolver mehr).

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function renderMarks(text, marks = []) {
  return marks.reduce((acc, mark) => {
    switch (mark.type) {
      case 'bold':
        return `<strong>${acc}</strong>`;
      case 'italic':
        return `<em>${acc}</em>`;
      case 'underline':
        return `<u>${acc}</u>`;
      case 'strike':
        return `<s>${acc}</s>`;
      case 'code':
        return `<code>${acc}</code>`;
      case 'link': {
        const href = mark.attrs?.href || '#';
        const target = mark.attrs?.target ? ` target="${mark.attrs.target}"` : '';
        return `<a href="${href}"${target}>${acc}</a>`;
      }
      default:
        return acc;
    }
  }, escapeHtml(text));
}

function renderNode(node) {
  if (!node) return '';

  switch (node.type) {
    case 'doc':
      return (node.content || []).map(renderNode).join('');

    case 'paragraph':
      return `<p>${(node.content || []).map(renderNode).join('')}</p>`;

    case 'heading': {
      const level = node.attrs?.level || 2;
      return `<h${level}>${(node.content || []).map(renderNode).join('')}</h${level}>`;
    }

    case 'text':
      return renderMarks(node.text || '', node.marks);

    case 'bullet_list':
      return `<ul>${(node.content || []).map(renderNode).join('')}</ul>`;

    case 'ordered_list':
      return `<ol>${(node.content || []).map(renderNode).join('')}</ol>`;

    case 'list_item':
      return `<li>${(node.content || []).map(renderNode).join('')}</li>`;

    case 'blockquote':
      return `<blockquote>${(node.content || []).map(renderNode).join('')}</blockquote>`;

    case 'horizontal_rule':
      return '<hr />';

    case 'hard_break':
      return '<br />';

    case 'image': {
      const src = node.attrs?.src || '';
      const alt = node.attrs?.alt || '';
      return `<img src="${src}" alt="${escapeHtml(alt)}" />`;
    }

    default:
      // Unbekannte Knoten: Kinder trotzdem rendern, falls vorhanden
      return (node.content || []).map(renderNode).join('');
  }
}

export function renderRichText(doc) {
  if (!doc) return '';
  return renderNode(doc);
}