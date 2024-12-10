import "react";
import "react-dom";
import { renderToReadableStream } from "react-dom/server";

const css = `
@font-face {
  font-family: 'CLIG';
  font-style: normal;
  font-weight: 800;
  src: url('https://fonts.clig.dev/EditorialNew-Regular.woff2') format('woff2')
}
* { font-family: 'CLIG'; color: white;font-size: 32px}
h1 {  font-size: 112px }
`;

function Component({ message }: { readonly message: string }) {
	return (
		<body
			style={{
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				display: "flex",
				backgroundColor: "black",
			}}
		>
			<style dangerouslySetInnerHTML={{ __html: css }} />
			<h1>{message}</h1>
			<div
				style={{
					whiteSpace: "nowrap",
					overflow: "hidden",
					animation: "marquee 1s linear infinite alternate",
				}}
			>
				...
			</div>
			<style>{`
				@keyframes marquee {
					0% { transform: translateX(100%); }
					100% { transform: translateX(-100%); }
				}
			`}</style>
		</body>
	);
}
const server = Bun.serve({
	port: 3001,
	async fetch() {
		const stream = await renderToReadableStream(
			<Component message="Memory-for-Future" />
		);
		return new Response(stream, {
			headers: { "Content-Type": "text/html" },
		});
	},
});

console.log(`Server running @ ${server.hostname}:${server.port}`);
