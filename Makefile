dist : dist/thingamajig.js
dist/thingamajig.js : lib/thingamajig.js
	@mkdir -p $(@D)
	@browserify -o $@ $<

.PHONY : test %.test