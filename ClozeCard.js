function ClozeCard(text, cloze){
  if (!(this instanceof ClozeCard)) { 
    return new ClozeCard(text, cloze);
  }

	this.fullText = text;
	this.cloze = cloze;
	this.partial = setPartial(this.fullText, this.cloze);

	this.resetPartial = function(cloze){
		this.cloze = cloze;
		this.partial = setPartial(this.fullText,this.cloze);
	}

	function setPartial(text, cloze){
		if (text.includes(cloze))
			return text.replace(cloze, "...");
		else {
			return false;
		}
	}
}

module.exports = ClozeCard;	