export function formatTime(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();

    const isToday =
        date.getDate() === now.getDate() &&
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear();

    const isYesterday =
        date.getDate() === now.getDate() - 1 &&
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear();

    const formattedTime = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });

    if (isToday) {
        return `${formattedTime} today`;
    } else if (isYesterday) {
        return `${formattedTime} yesterday`;
    } else {
        const formattedDate = date.toLocaleDateString([], {
            day: "2-digit",
            month: "short",
        });
        return `${formattedTime} ${formattedDate}`;
    }
}

export const formatAIText = (text: string): string => {
    // Regular expressions for various formatting elements
    const boldRegex = /\*\*(.+?)\*\*/g;
    const italicRegex = /\_(.+?)\_/g;
    const bulletPointRegex = /^\*\s(.+)/gm;
    const orderedListRegex = /^\d+\.\s(.+)/gm;
    const codeBlockRegex = /```([a-zA-Z0-9]*)\n([\s\S]*?)```/g;
    const paragraphRegex =
        /^(?!<h[23]>|<ul>|<li>|<strong>|<\/strong>|<em>|<\/em>|<code>|<\/code>|<pre>|<\/pre>)(.+)$/gm;

    // Convert formatting elements to HTML tags
    let formattedText = text
        .replace(boldRegex, "<strong>$1</strong>")
        .replace(italicRegex, "<em>$1</em>")
        .replace(bulletPointRegex, "<li>$1</li>")
        .replace(orderedListRegex, "<ol><li>$1</li></ol>")
        .replace(codeBlockRegex, "<pre><code>$2</code></pre>")
        .replace(paragraphRegex, "<p>$1</p>");

    // Wrap multiple <li> elements within their respective list containers
    formattedText = formattedText
        .replace(/(<li>[\s\S]*?<\/li>)(?=\s*<li>)/gm, "<ul>$1</ul>")
        .replace(/(<li>[\s\S]*?<\/li>)(?![\s\S]*<li>)/gm, "<ul>$1</ul>")
        .replace(/(<ol><li>[\s\S]*?<\/li>)(?=\s*<li>)/gm, "<ol>$1</ol>")
        .replace(/(<ol><li>[\s\S]*?<\/li>)(?![\s\S]*<li>)/gm, "<ol>$1</ol>");

    return formattedText;
};
