export default function OliveLoadingScreen() {
	return (
		<output
			aria-live="polite"
			aria-busy="true"
			aria-label="Loading SnapServe"
			className="boot-loader-shell"
		>
			<div className="boot-loader-shell__inner">
				<div className="boot-loader-copy">
					<p className="boot-loader-eyebrow">SnapServe</p>
					<h1 className="display-title boot-loader-title">Serving the site.</h1>
					<p className="boot-loader-body">
						Serving the site to you, fresh from the kitchen.
					</p>
					<span aria-hidden="true" className="boot-loader-track">
						<span className="boot-loader-track-dot" />
					</span>
					<p className="boot-loader-foot">Just a moment.</p>
				</div>
			</div>
		</output>
	);
}
