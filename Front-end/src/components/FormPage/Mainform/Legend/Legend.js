import React from 'react'
import './Legend.css'

export default function Legend() {
return (
	<aside id="frequency">
	{/* desktop version */}	
		<div className="desktop">
            <h3 className="frequencyTitle">Frequency</h3>
			<ul id="menu">
				<li  className="frequence">
					<a id="puce">0.</a> Never
				</li>
				<li className="frequence">
					<a id="puce">1.</a> Once
				</li>
				<li className="frequence">
					<a id="puce">2.</a> Seldom (> 1/year)
				</li>
				<li className="frequence">
					<a id="puce">3.</a> Frequently ( > 1/month)
				</li>
				<li className="frequence">
					<a id="puce">4.</a> Daily
				</li>
			</ul>
			</div>
				{/* mobile version */}			
			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav-frequency" >
                <span className="navbar-toggler-icon-frequency"></span>
                <h3>Frequency</h3>
            </button>
            <div className="collapse navbar-collapse" id="mobile-nav-frequency">
				<ul id="mobile-menu">
					<li  className="mobile-frequence">
						<a id="puce">0.</a> Never
					</li>
					<li className="mobile-frequence">
						<a id="puce">1.</a> Once
					</li>
					<li className="mobile-frequence">
						<a id="puce">2.</a> Seldom (> 1/year)
					</li>
					<li className="mobile-frequence">
						<a id="puce">3.</a> Frequently ( > 1/month)
					</li>
					<li className="mobile-frequence">
						<a id="puce">4.</a> Daily
					</li>
				</ul>
			</div>
	</aside>

	)
}
