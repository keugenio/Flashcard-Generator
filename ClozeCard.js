function ClozeCard(text, cloze){
  if (!(this instanceof ClozeCard)) { 
    return new ClozeCard(text, cloze);
  }

	this.fullText = text;
	this.cloze = cloze;
	this.partial = remove(this.fullText, this.cloze);

	function remove(text,cloze){
		if (text.includes(cloze))
			return text.replace(cloze, "");
		else {
			console.log (cloze + " not found in " +"'" + text + "'");
			return "";
		}
	}
}

module.exports = ClozeCard;