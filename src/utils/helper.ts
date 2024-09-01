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
    return (
        text
            // Replace headers (lines that start with ## or ###)
            .replace(/^##\s(.+)/gm, "<h2>$1</h2>") // H2
            .replace(/^###\s(.+)/gm, "<h3>$1</h3>") // H3

            // Replace bullet points (lines that start with *)
            .replace(/^\*\s(.+)/gm, "<li>$1</li>")

            // Wrap multiple <li> elements with a single <ul>
            .replace(/(<li>[\s\S]*?<\/li>)/gm, "<ul>$1</ul>")

            // Replace bold text (**text**)
            .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")

            // Wrap paragraphs (lines that are not wrapped with HTML tags)
            .replace(
                /^(?!<h[23]>|<ul>|<li>|<strong>|<\/strong>)(.+)$/gm,
                "<p>$1</p>"
            )
    );
};
