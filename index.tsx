import "react@^19.0.0-beta"
import "react-dom@^19.0.0-beta"
import { renderToReadableStream } from "react-dom/server"

const css = `
@font-face {
  font-family: 'CLIG';
  font-style: normal;
  font-weight: 800;
  src: url('https://fonts.clig.dev/EditorialNew-Regular.woff2') format('woff2')
}
* { font-family: 'CLIG'; color: white;font-size: 32px}
h1 {  font-size: 112px }
`

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
						<marquee
								behavior="alternate"
								loop="1"
								scrollamount="15"
								direction="left"
						>
								...
						</marquee>
				</body>
		)
}

const server = Bun.serve({
		port: 3000,
		async fetch() {
				const stream = await renderToReadableStream(<Component message="Memory of the future" />)
				return new Response(stream, {
						headers: { "Content-Type": "text/html" },
				})
		},
})

console.log(`Server running @ ${server.hostname}:${server.port}`)
