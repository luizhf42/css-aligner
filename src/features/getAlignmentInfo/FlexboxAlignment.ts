import CSSTree from "../../types/cssTree";
import BaseAlignment from "./BaseAlignment";

class FlexboxAlignment extends BaseAlignment {
	private verticalAlignmentMapping = {
		top: "flex-start",
		middle: "center",
		bottom: "flex-end",
	};

	private horizontalAlignmentMapping = {
		left: "flex-start",
		center: "center",
		right: "flex-end",
	};

	generateAST(): CSSTree {
		const parentDeclarations = {
			display: "flex",
			"align-items": this.verticalAlignmentMapping[this.verticalAlignment],
			"justify-content":
				this.horizontalAlignmentMapping[this.horizontalAlignment],
		};

		const elementDeclarations = {
			...this.getSizeDeclarations(),
			...this.getTextAlignmentDeclaration(),
		};

		return {
			selector: ".parent",
			declarations: parentDeclarations,
			children: [
				{
					selector: ".element",
					declarations: elementDeclarations,
				},
			],
		};
	}

	getExplanation() {
		const verticalAlignmentValue =
			this.verticalAlignmentMapping[this.verticalAlignment];
		const horizontalAlignmentValue =
			this.horizontalAlignmentMapping[this.horizontalAlignment];

		const explanationItems = [
			"This CSS uses Flexbox layout, which CSS properties must be set <strong>in the parent element!</strong>",
			`<code>align-items</code> uses the <code>${verticalAlignmentValue}</code> value, aligning the element vertically at the ${this.verticalAlignment} of the cross-axis.`,
			`<code>justify-content</code> uses the <code>${horizontalAlignmentValue}</code> value, aligning the element horizontally at the ${this.horizontalAlignment} of the main axis.`,
		];

		if (this.element === "text") {
			explanationItems.push(this.getTextAlignmentExplanation());
		}

		return {
			title: "Aligning an element using Flexbox",
			items: explanationItems,
		};
	}
}

export default FlexboxAlignment;
