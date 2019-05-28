  {this.state.grouping.map((item, idx) =>
                            <Link key={idx} to={{pathname:"/formpage", state : {modes: this.state, group: idx}}}>
                                <Button key={idx} style={{ margin: "20px", minWidth: "100px", width: "300px" }} color="success" size="lg" onClick={() => this.onRadioBtnClick(idx)} active={this.state.rSelected === idx}>{item.text}</Button>
                            </Link>
                            )}