import React, { Component } from 'react';
import { PhotoshopPicker } from "react-color";

class EmailForm extends Component {
	constructor(props) {
		super(props);

		this.handleSectionChange = this.handleSectionChange.bind(this);
		this.addSection = this.addSection.bind(this);
		this.removeSection = this.removeSection.bind(this);
		this.addItem = this.addItem.bind(this);
		this.removeItem = this.removeItem.bind(this);
		this.handleTopLevelChange = this.handleTopLevelChange.bind(this);
		this.handleQuickLinkChange = this.handleQuickLinkChange.bind(this);
		this.handleLinkItemChange = this.handleLinkItemChange.bind(this);
		this.addLink = this.addLink.bind(this);
		this.removeLink = this.removeLink.bind(this);
		this.setFont = this.setFont.bind(this);
		this.centerImage = this.centerImage.bind(this);
		this.save = this.save.bind(this);
		this.reset = this.reset.bind(this);
		this.handleGreetColor = this.handleGreetColor.bind(this);
		this.handleSectionColor = this.handleSectionColor.bind(this);
		this.handleQuickColor = this.handleQuickColor.bind(this);
		this.bulletinHandle = this.bulletinHandle.bind(this);
		this.bulletinChange = this.bulletinChange.bind(this);
		this.handleImport = this.handleImport.bind(this);

		this.defaultState = this.state = {
			display: "form",
			bold_greeting: "Happy Monday, CSA!",
			sub_greeting: "Praise God for another week!",
			greeting_color: "#9900ff",
			sections: [
				{
					title: "Announcements",
					image_url: "https://cdn-images-1.medium.com/max/1600/1*ZVYpEAxnObj7kWNnyKr_nQ.jpeg",
					color: "#0000ff",
					image_size: 200,
					items: [
						{
							title: "",
							body: "",
							bulletin_exclusive: false
						}
					]
				},
				{
					title: "Upcoming Events",
					image_url: "",
					color: "#00F6ED",
					image_size: 200,
					items: [
						{
							title: "Totus Tuesday",
							body: "Join us for adoration at St. Paul's this <span>Tuesday at 8</span> followed by a social in the CSA Lounge at <span>9</span>.",
							bulletin_exclusive: false
						}
					]
				},
				{
					title: "Saint of the Week",
					image_url: "",
					color: "#00ff00",
					image_size: 200,
					items: [
						{
							title: "",
							body: ""
						}
					]

				}
			],
			salutation: "Love,<br/>Luke <3",
			quick_links: {
				color: "#FF0003",
				items: [
					{
						title: "Catholic Google Calendar",
						link: "https://calendar.google.com/calendar/embed?src=harvardcatholic%40gmail.com&ctz=America/New_York"
					},
					{
						title: "CSA GroupMe",
						link: "https://groupme.com/join_group/38315606/7wcF30"
					},
					{
						title: "Saint of the Week Requests",
						link: "https://goo.gl/forms/0NRECakIIuxUasJf1"
					},
					{
						title: "Ask-A-Priest",
						link: "https://goo.gl/forms/9ZY48tNikUrD11163"
					},
					{
						title: "Feedback Form",
						link: "https://goo.gl/forms/hw7O5ouKTbhSYDtH3"
					}
				]
			},
			import: ""
		}
	}

	centerImage({width = 200} = {}) {
		return {
			display: "block",
			marginLeft: "auto",
			marginRight: "auto",
			width: `${width}px`
		}
	}

	FORM = "form"
	EMAIL = "email"
	BULLETIN = "bulletin"
	JSON_EXPORT = "JSON_export"
	JSON_IMPORT = "JSON_import"

	setFont({bold = false, big = false, centered = false, color = "#000000"} = {}) {
		return {
			fontWeight: bold ? 650 : 400,
			fontSize: big ? "20pt" : "11pt",
			color: `${color}`,
			textAlign: centered ? "center" : "left"
		}
	}

	handleQuickColor(c, e) {
		this.setState({
			...this.state,
			quick_links: {
				...this.state.quick_links,
				color: c.hex
			}
		})
	}

	handleGreetColor(c, e) {
		this.setState({
			...this.state,
			greeting_color: c.hex
		})
	}

	handleQuickLinkChange(e) {
		e.preventDefault();
		this.setState({
			...this.state,
			quick_links: {
				...this.state.quick_links,
				[e.target.name]: e.target.value
			}
		});
	}

	handleImport(e) {
		e.preventDefault();
		let newState = JSON.parse(this.state.import)
		this.setState({
			display: this.FORM,
			bold_greeting: newState.bold_greeting,
			sub_greeting: newState.sub_greeting,
			greeting_color: newState.greeting_color,
			sections: newState.sections,
			salutation: newState.salutation,
			quick_links: newState.quick_links,
			import: ""
		});
	}

	handleSectionColor = i => (c, e) => {
		this.setState({
			...this.state,
			sections: 
				this.state.sections.map((section, index) => {
					if (index === i) {
						return {
							...section,
							color: c.hex
						}
					}
					return section
				})
		})
	}

	addSection(e) {
		e.preventDefault();
		this.setState({
			...this.state,
			sections: [...this.state.sections, {
				title: "",
				image_url: "",
				color: "",
				image_size: 200,
				items: [
					{
						title: "",
						body: ""
					}
				]
			}]
		});
	}

	removeSection(e) {
		e.preventDefault();
		if (this.state.sections.length > 0) {
			this.setState({
				...this.state,
				sections: this.state.sections.slice(0, -1)
			})
		}
	}

	addItem = i => e => {
		e.preventDefault();
		this.setState({
			...this.state,
			sections: 
				this.state.sections.map((section, index) => {
					if (i === index) {
						return {
							...this.state.sections[index],
							items: [...this.state.sections[index].items, {
								title: "",
								body: "",
								bulletin_exclusive: false
							}]
						}
					}
					return section;
				})
		})
	}

	bulletinHandle = location => e => {
		e.preventDefault();
		if (e.target.value === "add") {
			this.setState({
				...this.state,
				sections: 
					this.state.sections.map((section, index) => {
						if (section.title.toLowerCase() === location) {
							return {
								...section,
								items: [...section.items, {
									title: "",
									body: "",
									bulletin_exclusive: true
								}]
							}
						}
						return section;
					})
			})
		} else if (e.target.value === "remove") {
			if (this.state.sections.filter(
					section => section.title.toLowerCase() === location
				)[0].items.filter(
					item => item.bulletin_exclusive
				).length > 0) {
					this.setState({
						...this.state,
						sections: 
							this.state.sections.map((section, index) => {
								if (section.title.toLowerCase() === location) {
									return {
										...section,
										items: section.items.slice(0, -1)
									}
								}
								return section;
							})
					})
			}
		}
	}

	bulletinChange = (location, ii) => e => {
		e.preventDefault();
		this.setState({
			...this.state,
			sections: 
				this.state.sections.map((section) => {
					if (section.title.toLowerCase() === location.toLowerCase()) {
						return {
							...section,
							items: 
								section.items.map((item, index) => {
									if (index === ii) {
										return {
											...item,
											[e.target.name]: e.target.value
										}
									}
									return item
								})
						}
					}
					return section;
				})
		})
	}

	removeItem = i => e => {
		e.preventDefault();
		if (this.state.sections[i].items.length > 0) {
			this.setState({
				...this.state,
				sections: 
					this.state.sections.map((section, index) => {
						if (i === index) {
							return {
								...section,
								items: this.state.sections[index].items.slice(0, -1)
							}
						}
						return section;
					})
			})
		}
	}

	addLink(e) {
		e.preventDefault();
		this.setState({
			...this.state,
			quick_links: {
				...this.state.quick_links,
				items: [...this.state.quick_links.items, {
					title: "",
					link: ""
				}]
			}
		})
	}

	removeLink(e) {
		e.preventDefault();
		if (this.state.quick_links.items.length > 1) {
			this.setState({
				...this.state,
				quick_links: {
					...this.state.quick_links,
					items: this.state.quick_links.items.slice(0, -1)
				}
			})
		}
	}

	handleLinkItemChange = i => e => {
		e.preventDefault()
		this.setState({
			...this.state,
			quick_links: {
				...this.state.quick_links,
				items: this.state.quick_links.items.map((item, index) => {
					if (i === index) {
						return {
							...item,
							[e.target.name]: e.target.value
						}
					}
					return item
				})
			}
		})
	}

	handleSectionChange = i => e => {
		e.preventDefault();
		this.setState({
			...this.state,
			sections: 
				this.state.sections.map((section, index) => {
					if (index === i) {
						return {
							...section,
							[e.target.name]: e.target.value
						}
					}
					return section
				})
		})
	}

	handleTopLevelChange(e) {
		e.preventDefault()
		this.setState({
			...this.state,
			[e.target.name]: e.target.value
		});
	}

	handleSubsectionChange = (oi, ii) => e => {
		e.preventDefault();
		this.setState({
			...this.state,
			sections:
				this.state.sections.map((section, outerIndex) => {
					if (outerIndex === oi) {
						return {
							...section,
							items:
								section.items.map((subSection, innerIndex) => {
									if (innerIndex === ii) {
										return {
											...subSection,
											[e.target.name]: e.target.value 
										} 
									} 
									return subSection;
								})
						}
					} else {
						return section
					}
				})
		})
	}

	componentDidMount() {
		window.addEventListener('beforeunload', this.save);
		const serializedState = localStorage.getItem("state");
		this.setState(JSON.parse(serializedState));
	}

	save() {
		const serializedState = JSON.stringify(this.state)
		localStorage.setItem("state", serializedState);
	}

	componentWillUnmount() {
		this.save();
		window.removeEventListener("beforeunload", this.save);
	}

	reset(e) {
		e.preventDefault();
		const proceed = window.confirm("Are you sure you want to reset this form?");
		if (proceed)
			this.setState(this.defaultState);
	}

	getJSONexport(e) {
		e.preventDefault();

	}


	render() {
		switch (this.state.display) {
			case this.FORM:
				return (
					<div className="container">
						<form>
							<br/>
							<h1>Greetings:</h1>
							<div className="form-group">
								<label>Main Greeting (the one in bold LOL)</label>
								<input className="form-control" name="bold_greeting" onChange={this.handleTopLevelChange} value={this.state.bold_greeting}/>
							</div>
							<div className="form-group">
								<label>Intro</label>
								<textarea className="form-control" name="sub_greeting" onChange={this.handleTopLevelChange} value={this.state.sub_greeting}/>
							</div>
							<div className="form-group">
								<label>Main Greeting Color</label>
								<PhotoshopPicker color={this.state.greeting_color} onChangeComplete={this.handleGreetColor}/>
							</div>
							<br/>
							<h1>Sections:</h1>
							<hr className="thick"/>
							{this.state.sections.map((section, outerIndex) => {
								return (
									<React.Fragment key={outerIndex}>
										<br/>
										<h2>{section.title}</h2>
										<br/>
										<div className="form-group">
											<label>Title:</label>
											<input className="form-control" type="text" name="title" onChange={this.handleSectionChange(outerIndex)} value={this.state.sections[outerIndex].title} />
										</div>
										<div className="form-group">
											<label>Color:</label>
											<PhotoshopPicker color={section.color} onChangeComplete={this.handleSectionColor(outerIndex)}/>
										</div>
										<div className="form-group">
											<label>Image URL:</label>
											<input className="form-control" type="text" name="image_url" onChange={this.handleSectionChange(outerIndex)} value={this.state.sections[outerIndex].image_url} />
										</div>
										<div className="form-group">
											<label>Image size:</label>
											<input className="form-control" type="text" name="image_size" onChange={this.handleSectionChange(outerIndex)} value={this.state.sections[outerIndex].image_size} />
										</div>
										<br/>
										<div className="form-group">
											<label>Items:</label>
											{this.state.sections[outerIndex].items.map((subSection, innerIndex) => {
												if (!subSection.bulletin_exclusive) {
													return (
														<React.Fragment key={innerIndex}>
															<div className="form-group">
																<label>Title:</label>
																<input className="form-control" type="text" name="title" onChange={this.handleSubsectionChange(outerIndex, innerIndex)} value={this.state.sections[outerIndex].items[innerIndex].title} />
															</div>
															<div className="form-group">
																<label>Body:</label>
																<textarea className="form-control" name="body" onChange={this.handleSubsectionChange(outerIndex, innerIndex)} value={this.state.sections[outerIndex].items[innerIndex].body} />
															</div>
															<br/>
														</React.Fragment>
													)
												}
											})}
										</div>
										<button className="btn btn-success" name="addItem" onClick={this.addItem(outerIndex)}>Add Item</button>
										<button className="btn btn-danger" name="removeItem" onClick={this.removeItem(outerIndex)}>Remove Item</button>
										<br/>
										<br/>
										<hr className="thick"/>
										<br/>
										<br/>
									</React.Fragment>
								)
							})}
							<button className="btn btn-success" name="addSection" onClick={this.addSection}>Add Section</button>
							<button className="btn btn-danger" name="removeSection" onClick={this.removeSection}>Remove Section</button>
							<br/>
							<br/>
							<h1>Salutation:</h1>
							<textarea className="form-control" name="salutation" value={this.state.salutation} onChange={this.handleTopLevelChange}/>
							<br/>
							<h1>Quick Links</h1>
							<div className="form-group">
								<label>Quick Link Color:</label>
								<PhotoshopPicker color={this.state.quick_links.color} onChangeComplete={this.handleQuickColor}/>
							</div>
							<h3>Links:</h3>
							{this.state.quick_links.items.map((item, index) => {
								return (
									<React.Fragment key={index}>
										<div className="form-group">
											<label>Title:</label>
											<input className="form-control" type="text" onChange={this.handleLinkItemChange(index)} name="title" value={item.title}/>
										</div>
										<div className="form-group">
											<label>Link:</label>
											<input className="form-control" type="text" onChange={this.handleLinkItemChange(index)} name="link" value={item.link}/>
										</div>
										<hr className="lessThick"/>
									</React.Fragment>
								)
							})}
							<br/>
							<button className="btn btn-success" onClick={this.addLink}>Add Link</button>
							<button className="btn btn-danger" onClick={this.removeLink}>Remove Link</button>
							<br/>
							<br/>
							<br/>
							<button className="btn btn-primary btn-lg" name="display" value={this.EMAIL} onClick={this.handleTopLevelChange}>Get email!</button>
							<br/>
							<button className="btn btn-success btn-lg" name="display" value={this.BULLETIN} onClick={this.handleTopLevelChange}>Get Bulletin!</button>
							<br/>
							<br/>
							<button className="btn btn-dark btn-lg" name="display" value={this.JSON_EXPORT} onClick={this.handleTopLevelChange}>Get JSON export!</button>
							<br/>
							<button className="btn btn-light btn-lg" name="display" value={this.JSON_IMPORT} onClick={this.handleTopLevelChange}>Import JSON!</button>
							<br/>
							<br/>
							<br/>
							<br/>
							<button className="btn btn-danger btn-lg" onClick={this.reset}>Reset Form</button>
							<br/>
							<br/>
						</form>
					</div>
				) 
			case this.EMAIL:
				return (
					<React.Fragment>
						<div className="theHTML">
							<style dangerouslySetInnerHTML={{__html: `p span span {font-weight: 650; color: ${this.state.greeting_color}}`}}/>
							<p style={this.setFont({big: true, bold: true, color: this.state.greeting_color, centered: true})}>
								{this.state.bold_greeting}
							</p>
							<br/>
							<p style={this.setFont({centered: true})}>
								<span dangerouslySetInnerHTML={{__html: this.state.sub_greeting}}></span>
							</p>
							{this.state.sections.map(section => {
								return (
									<React.Fragment>
										<p style={this.setFont({centered: true, color: section.color, big: true, bold: true})}>
											{section.title}
										</p>
										<img 
											src={section.image_url} 
											style={this.centerImage({width: section.image_size})}/>
										{section.items.map(item => {
											if (! item.bulletin_exclusive) {
												return (
													<React.Fragment>
														<p style={this.setFont()}>
															<span dangerouslySetInnerHTML={{__html: `${item.title}:`}} style={this.setFont({bold: true, color: section.color})}></span>
															&nbsp;&nbsp;
															<span dangerouslySetInnerHTML={{__html: item.body}}></span>
														</p>
													</React.Fragment>
												)
											}
										})}
									</React.Fragment>
								)
							})}
							<br/>
							<p style={this.setFont()} dangerouslySetInnerHTML={{__html: this.state.salutation}}></p>
							<br/>
							<p style={this.setFont({bold: true, big: true, centered: true, color: this.state.quick_links.color})}>Quick Links</p>
							{this.state.quick_links.items.map(item => {
								return (
									<p style={this.setFont()}>
										<span style={this.setFont({bold: true, color: this.state.quick_links.color})} dangerouslySetInnerHTML={{__html: `${item.title}:`}}></span>
										&nbsp;&nbsp;
										<a href={item.link}>{item.link}</a>
									</p>
								)
							})}
						</div>
						<br/>
						<button name="display" className="btn btn-primary btn-lg" value={this.FORM} onClick={this.handleTopLevelChange}>Go back to form!</button>
						<br/>
						<br/>
					</React.Fragment>
				)
			case this.BULLETIN:
				const bulletinSet = new Set(["announcements", "upcoming events"])
				return (
					<React.Fragment>
						<div className="theHTML">
							<style dangerouslySetInnerHTML={{__html: "p span span {font-weight: 650}"}}/>
							{
							this.state.sections.map(section => {
								if (bulletinSet.has(section.title.toLowerCase())) {
									return (
										<React.Fragment>
											<p style={this.setFont({bold: true, big: true})}>
												{section.title}:
											</p>
											{section.items.map(item => {
												return (
													<p style={this.setFont()}>
														<span style={this.setFont({bold: true})} dangerouslySetInnerHTML={{__html: item.title}}></span>
														:&nbsp;&nbsp;
														<span dangerouslySetInnerHTML={{__html: item.body}}></span>
													</p>
												)
											})}
										</React.Fragment>
									)
								}
								return null;
							})}
						</div>
						<br/>
						<br/>
						<div className="container">
							<form>
								{
								[...bulletinSet].map(element => {
									const section = this.state.sections.filter(section => section.title.toLowerCase() === element)[0]
									if (section) {
										return (
											<React.Fragment>
												<h3>{section.title}</h3>
												<br/>
												{
												section.items.map((item, i) => {
													if (item.bulletin_exclusive) {
														return (
															<React.Fragment>
																<div className="form-group">
																	<label>Title</label>
																	<input className="form-control" name="title" onChange={this.bulletinChange(section.title, i)} value={item.title}/>
																</div>
																<div className="form-group">
																	<label>Body</label>
																	<textarea className="form-control" name="body" onChange={this.bulletinChange(section.title, i)} value={item.body}/>
																</div>
															</React.Fragment>
														)
													}
												})}
												<button className="btn btn-success" value="add" onClick={this.bulletinHandle(element)}>Add {element}</button>
												<button className="btn btn-danger" value="remove" onClick={this.bulletinHandle(element)}>Remove {element}</button>
												<br/>
												<br/>
												<br/>
												<br/>
											</React.Fragment>
										)
									}
								})}
							</form>
						</div>
						<br/>
						<br/>
						<br/>
						<button name="display" className="btn btn-primary btn-lg" value={this.FORM} onClick={this.handleTopLevelChange}>Go back to form!</button>
					</React.Fragment>
				)
			case this.JSON_EXPORT:
				return (
					<React.Fragment>
					<span>{JSON.stringify({...this.state, display: this.JSON_IMPORT})}</span>
					<br/>
					<br/>
					<button name="display" className="btn btn-primary btn-lg" value={this.FORM} onClick={this.handleTopLevelChange}>Go back to form!</button>
					</React.Fragment>
				)
			case this.JSON_IMPORT:
				return (
					<React.Fragment>
					<form>
						<textarea rows="20" className="form-control" name="import" value={this.state.import} onChange={this.handleTopLevelChange}/>
						<br/>
						<button className="btn btn-primary" name="importJSON" onClick={this.handleImport}>Import!</button>
					</form>
					<br/>
					<br/>
					<button name="display" className="btn btn-primary btn-lg" value={this.FORM} onClick={this.handleTopLevelChange}>Go back to form!</button>
					</React.Fragment>
				)
			default:
				return (
					<React.Fragment>
					<h2>Something went wrong...</h2>
					<br/>
					<button name="display" className="btn btn-primary btn-lg" value={this.FORM} onClick={this.handleTopLevelChange}>Go back to form!</button>
					</React.Fragment>
				)
		}
	}
}

export default EmailForm;