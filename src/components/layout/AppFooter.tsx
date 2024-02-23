export default function AppFooter() {
	return (
		<footer className="mt-auto bg-brandPink py-4 font-bold text-white">
			<div className="container flex flex-col items-center justify-between gap-y-4 md:flex-row md:gap-x-4 md:gap-y-0">
				<p>{`All Copyrights Reserved News App ${new Date().getFullYear()} ©`}</p>
				<p>
					Designed & Developed With{" "}
					<span className="ml-1 rounded-md bg-white p-1">
						<span className="animate-pulse">❤️</span>
					</span>
				</p>
			</div>
		</footer>
	);
}
