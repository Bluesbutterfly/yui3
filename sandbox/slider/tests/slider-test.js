var suite = new Y.Test.Suite("Y.Slider");

suite.add( new Y.Test.Case({
    name: "Lifecycle",

    setUp: function () {
        Y.one("body").append('<div id="testbed"></div>');
    },

    tearDown: function () {
        Y.one("#testbed").remove(true);
    },

    "test default construction": function () {
        Y.Assert.isInstanceOf( Y.Slider, new Y.Slider() );
    },

    "test SliderBase construction": function () {
        Y.Assert.isInstanceOf( Y.SliderBase, new Y.SliderBase() );
    },

    "test render(selector)": function () {
        Y.one("#testbed").setContent(
            "<div></div>" +   // block element
            '<div class="floated" style="float:left"></div>' + // float
            "<p></p>" +       // limited block element
            "<span></span>"); // inline element

        (new Y.Slider().render("#testbed > div"));
        (new Y.Slider().render("#testbed > div.floated"));
        (new Y.Slider().render("#testbed > p"));
        (new Y.Slider().render("#testbed > span"));

        var div  = Y.one("#testbed > div"),
            fl   = Y.one("#testbed > div.floated"),
            p    = Y.one("#testbed > p"),
            span = Y.one("#testbed > span");

        Y.assert( (div.get("offsetHeight") > 0) );
        Y.assert( (fl.get("offsetHeight") > 0) );
        Y.assert( (p.get("offsetHeight") > 0) );
        Y.assert( (span.get("offsetHeight") > 0) );

        Y.assert( (fl.get("offsetWidth") > 0) );
        Y.assert( (span.get("offsetWidth") > 0) );

        Y.Assert.areEqual( 8, div.all("span,img").size() );
        Y.Assert.areEqual( 8, fl.all("span,img").size() );
        Y.Assert.areEqual( 8, p.all("span,img").size() );
        Y.Assert.areEqual( 8, span.all("span,img").size() );
    },

    "test render( node )": function () {
        Y.one("#testbed").setContent(
            "<div></div>" +   // block element
            '<div class="floated" style="float:left"></div>' + // float
            "<p></p>" +       // limited block element
            "<span></span>"); // inline element

        var div  = Y.one("#testbed > div"),
            fl   = Y.one("#testbed > div.floated"),
            p    = Y.one("#testbed > p"),
            span = Y.one("#testbed > span");

        (new Y.Slider().render(div));
        (new Y.Slider().render(fl));
        (new Y.Slider().render(p));
        (new Y.Slider().render(span));

        Y.assert( (div.get("offsetHeight") > 0) );
        Y.assert( (fl.get("offsetHeight") > 0) );
        Y.assert( (p.get("offsetHeight") > 0) );
        Y.assert( (span.get("offsetHeight") > 0) );

        Y.assert( (fl.get("offsetWidth") > 0) );
        Y.assert( (span.get("offsetWidth") > 0) );

        Y.Assert.areEqual( 8, div.all("span,img").size() );
        Y.Assert.areEqual( 8, fl.all("span,img").size() );
        Y.Assert.areEqual( 8, p.all("span,img").size() );
        Y.Assert.areEqual( 8, span.all("span,img").size() );
    },

    "test render: selector attrib in constructor": function () {
        Y.one("#testbed").setContent(
            "<div></div>" +   // block element
            '<div class="floated" style="float:left"></div>' + // float
            "<p></p>" +       // limited block element
            "<span></span>"); // inline element

        (new Y.Slider({ render: "#testbed > div" }));
        (new Y.Slider({ render: "#testbed > div.floated" }));
        (new Y.Slider({ render: "#testbed > p" }));
        (new Y.Slider({ render: "#testbed > span" }));

        var div  = Y.one("#testbed > div"),
            fl   = Y.one("#testbed > div.floated"),
            p    = Y.one("#testbed > p"),
            span = Y.one("#testbed > span");

        Y.assert( (div.get("offsetHeight") > 0) );
        Y.assert( (fl.get("offsetHeight") > 0) );
        Y.assert( (p.get("offsetHeight") > 0) );
        Y.assert( (span.get("offsetHeight") > 0) );

        Y.assert( (fl.get("offsetWidth") > 0) );
        Y.assert( (span.get("offsetWidth") > 0) );

        Y.Assert.areEqual( 8, div.all("span,img").size() );
        Y.Assert.areEqual( 8, fl.all("span,img").size() );
        Y.Assert.areEqual( 8, p.all("span,img").size() );
        Y.Assert.areEqual( 8, span.all("span,img").size() );
    },

    "test render: node attrib in constructor": function () {
        Y.one("#testbed").setContent(
            "<div></div>" +   // block element
            '<div class="floated" style="float:left"></div>' + // float
            "<p></p>" +       // limited block element
            "<span></span>"); // inline element

        var div  = Y.one("#testbed > div"),
            fl   = Y.one("#testbed > div.floated"),
            p    = Y.one("#testbed > p"),
            span = Y.one("#testbed > span");

        (new Y.Slider({ render: div }));
        (new Y.Slider({ render: fl }));
        (new Y.Slider({ render: p }));
        (new Y.Slider({ render: span }));

        Y.assert( (div.get("offsetHeight") > 0) );
        Y.assert( (fl.get("offsetHeight") > 0) );
        Y.assert( (p.get("offsetHeight") > 0) );
        Y.assert( (span.get("offsetHeight") > 0) );

        Y.assert( (fl.get("offsetWidth") > 0) );
        Y.assert( (span.get("offsetWidth") > 0) );

        Y.Assert.areEqual( 8, div.all("span,img").size() );
        Y.Assert.areEqual( 8, fl.all("span,img").size() );
        Y.Assert.areEqual( 8, p.all("span,img").size() );
        Y.Assert.areEqual( 8, span.all("span,img").size() );
    },

    "test render off DOM": function () {
        var container = Y.Node.create("<div></div>");

        (new Y.Slider().render(container));

        Y.Assert.areEqual( 8, container.all("span,img").size() );
    },

    "test destroy() before render": function () {
        var slider = new Y.Slider();

        slider.destroy();

        Y.Assert.isTrue( slider.get("destroyed") );
    },

    "test destroy() after render off DOM": function () {
        var container = Y.Node.create("<div></div>"),
            slider = new Y.Slider();

        slider.render( container );

        slider.destroy();

        Y.Assert.isTrue( slider.get("destroyed") );

        Y.Assert.isNull( container.get("firstChild") );
    },

    "test destroy() after render to DOM": function () {
        var slider = new Y.Slider();

        slider.render( "#testbed" );

        slider.destroy();

        Y.Assert.isTrue( slider.get("destroyed") );

        Y.Assert.isNull( Y.one("#testbed").get("firstChild") );
    }
}));

suite.add( new Y.Test.Case({
    name: "API",

    setUp: function () {
        Y.one('body').append('<div id="testbed"></div>');

        this.slider = new Y.Slider();
    },

    tearDown: function () {
        this.slider.destroy();

        Y.one('#testbed').remove(true);
    },

    "test getValue() and setValue(v) before render": function () {
        var s = this.slider;

        Y.Assert.areEqual( 0, s.getValue() );

        s.setValue(50);
        Y.Assert.areEqual( 50, s.getValue() );

        // TODO: this is a bug; should be 3
        s.setValue(3.3333);
        Y.Assert.areEqual( 3.3333, s.getValue() );

        // out of range rejected by validator
        s.setValue(-10);
        Y.Assert.areEqual( 3.3333, s.getValue() );

        s.setValue(110);
        Y.Assert.areEqual( 3.3333, s.getValue() );
        Y.Assert.areEqual( s.get('value'), s.getValue() );

        // TODO: this is a bug; should be 7
        s.set('value', 6.66666);
        Y.Assert.areEqual( 6.66666, s.getValue() );
        Y.Assert.areEqual( s.get('value'), s.getValue() );
    },

    "test getValue() and setValue(v) after render() to hidden container": function () {
        var container = Y.Node.create('<div></div>'),
            s = this.slider;

        s.render( container );

        Y.Assert.areEqual( 0, s.getValue() );

        s.setValue(50);
        Y.Assert.areEqual( 50, s.getValue() );

        // TODO: this is a bug; should be 3
        s.setValue(3.3333);
        Y.Assert.areEqual( 3.3333, s.getValue() );

        s.setValue(-10);
        Y.Assert.areEqual( 3.3333, s.getValue() );

        s.setValue(110);
        Y.Assert.areEqual( 3.3333, s.getValue() );
        Y.Assert.areEqual( s.get('value'), s.getValue() );

        // TODO: this is a bug; should be 7
        s.set('value', 6.66666);
        Y.Assert.areEqual( 6.66666, s.getValue() );
        Y.Assert.areEqual( s.get('value'), s.getValue() );
    },

    "test getValue() and setValue(v) after render() to DOM": function () {
        var s = this.slider;

        s.render('#testbed');

        Y.Assert.areEqual( 0, s.getValue() );

        s.setValue(50);
        Y.Assert.areEqual( 50, s.getValue() );

        s.setValue(3.3333);
        Y.Assert.areEqual( 3, s.getValue() );

        s.setValue(-10);
        Y.Assert.areEqual( 3, s.getValue() );

        s.setValue(110);
        Y.Assert.areEqual( 3, s.getValue() );
        Y.Assert.areEqual( s.get('value'), s.getValue() );

        s.set('value', 6.66666);
        Y.Assert.areEqual( 7, s.getValue() );
        Y.Assert.areEqual( s.get('value'), s.getValue() );
    },

    "setValue(v) then render() should position thumb": function () {
        var s = this.slider;

        s.setValue(20);
        s.render("#testbed");

        Y.Assert.areEqual( 27, parseInt(s.thumb.getStyle("left"),10) );
    },

    "setValue(v) after render() should move the thumb": function () {
        var s = this.slider;

        s.render('#testbed');

        Y.Assert.areEqual( 0, parseInt(s.thumb.getStyle('left'),10) );

        s.setValue(20);
        Y.Assert.areEqual( 27, parseInt(s.thumb.getStyle('left'),10) );

        s.setValue(0);
        Y.Assert.areEqual( 0, s.getValue() );
        Y.Assert.areEqual( 0, parseInt(s.thumb.getStyle('left'),10) );

        s.setValue(100);
        Y.Assert.areEqual( 100, s.getValue() );
        Y.Assert.areEqual( 135, parseInt(s.thumb.getStyle('left'),10) );
    },

    "syncUI() should move the thumb after setValue(v) while hidden": function () {
        var s = this.slider;

        Y.one('#testbed').setStyle('display','none');

        s.render('#testbed');

        Y.Assert.areEqual( 0, parseInt(s.thumb.getStyle('left'),10) );

        s.setValue(20);
        Y.Assert.areEqual( 0, parseInt(s.thumb.getStyle('left'),10) );


        Y.one('#testbed').setStyle('display','');
        Y.Assert.areEqual( 0, parseInt(s.thumb.getStyle('left'),10) );

        s.syncUI();
        Y.Assert.areEqual( 27, parseInt(s.thumb.getStyle('left'),10) );
    }
}));

suite.add( new Y.Test.Case({
    name: "Attributes",

    _should: {
        fail: {
            // TODO This is a bug. invalid construction value should fallback
            // to specified attribute default
            "axis should only accept 'x', 'X', 'y', and 'Y'": true
        }
    },

    setUp: function () {
        Y.one('body').append('<span id="testbed"></span>');
    },

    tearDown: function () {
        Y.one('#testbed').remove(true);
    },

    "test axis": function () {
        var testbed = Y.one('#testbed'),
            slider = new Y.Slider({ axis: 'x' }).render( testbed ),
            bb = testbed.get("firstChild");

        Y.assert( (bb.get("offsetWidth") > 100), "offsetWidth > 100" );
        Y.assert( (bb.get("offsetHeight") < 50), "offsetHeight < 50" );

        slider.destroy();

        slider = new Y.Slider({ axis: 'y' }).render( testbed );
        bb = testbed.get("firstChild");

        Y.assert( (bb.get("offsetHeight") > 100), "offsetHeight > 100" );
        Y.assert( (bb.get("offsetWidth") < 50), "offsetWidth < 50" );

        slider.destroy();
    },

    "axis should be writeOnce": function () {
        var slider = new Y.Slider();

        Y.Assert.areEqual("x", slider.get("axis"));

        slider.set('axis', 'y');
        Y.Assert.areEqual("x", slider.get("axis"));

        slider.destroy();

        slider = new Y.Slider({ axis: 'y' });
        Y.Assert.areEqual("y", slider.get("axis"));

        slider.set('axis', 'x');
        Y.Assert.areEqual("y", slider.get("axis"));
    },

    "axis should only accept 'x', 'X', 'y', and 'Y'": function () {
        var attempts = "a b c 1 2 3 yx yy YX YY vertical vert eks".split(/ /);

        Y.each( attempts, function ( axis ) {
            var slider = new Y.Slider({ axis: axis });
            Y.Assert.areEqual("x", slider.get("axis"));
            slider.destroy();
        });

        attempts = ['y', 'Y'];
        Y.each( attempts, function ( axis ) {
            var slider = new Y.Slider({ axis: axis });
            Y.Assert.areEqual("y", slider.get("axis"));
            slider.destroy();
        });
    },

    "test length": function () {
        Y.one('#testbed').append('<div id="slider"></div><div id="ref"></div>');

        var testbed = Y.one("#slider"),
            ref     = Y.one("#ref"),
            slider, delta, bb;

        slider = new Y.Slider().render( testbed );
        bb = testbed.get('firstChild');

        delta = bb.get('offsetWidth') - parseInt(slider.get('length'), 10);

        slider.destroy();

        slider = new Y.Slider({ length: 50 }).render( testbed );
        bb = testbed.get('firstChild');

        Y.Assert.areEqual( (50 + delta), bb.get('offsetWidth') );

        slider.set('length', 300);
        Y.Assert.areEqual( (300 + delta), bb.get('offsetWidth') );

        slider.set('length', "-140px");
        Y.Assert.areEqual( (300 + delta), bb.get('offsetWidth') );

        ref.setStyle("width", "23.5em");
        slider.set('length', '23.5em');
        Y.Assert.areEqual( (ref.get('offsetWidth') + delta), bb.get('offsetWidth') );

        slider.destroy();

        slider = new Y.Slider({ axis: 'y' }).render( testbed );
        bb = testbed.get('firstChild');

        delta = bb.get('offsetHeight') - parseInt(slider.get('length'), 10);

        slider.destroy();

        slider = new Y.Slider({ axis: 'y', length: 50 }).render( testbed );
        bb = testbed.get('firstChild');

        Y.Assert.areEqual( (50 + delta), bb.get('offsetHeight') );

        slider.set('length', 300);
        Y.Assert.areEqual( (300 + delta), bb.get('offsetHeight') );

        slider.set('length', "-140px");
        Y.Assert.areEqual( (300 + delta), bb.get('offsetHeight') );

        ref.setStyle("height", "23.5em");
        slider.set('length', '23.5em');
        Y.Assert.areEqual( (ref.get('offsetHeight') + delta), bb.get('offsetHeight') );
    },

    "test thumbUrl": function () {
    },

    "test clickableRail": function () {
    },

    "test min": function () {
    },

    "test max": function () {
    },

    "test value": function () {
    }
}));


suite.add( new Y.Test.Case({
    name: "Runtime expectations",

    setUp: function () {
    },

    tearDown: function () {
    },

    "test ": function () {
    }
}));

/*
suite.add( new Y.Test.Case({
    name: "Bugs",

    setUp: function () {
    },

    tearDown: function () {
    },

    "test ": function () {
    }
}));
*/

Y.Test.Runner.add( suite );
