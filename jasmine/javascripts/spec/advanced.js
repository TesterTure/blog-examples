// Generated by CoffeeScript 1.3.3
(function() {
  var Person, currentWindowOnload, execJasmine, htmlReporter, jasmineEnv;

  Person = (function() {

    Person.prototype.name = null;

    Person.prototype.age = 0;

    function Person(name, age) {
      this.name = name;
      this.age = age;
    }

    Person.prototype.getName = function() {
      return this.name;
    };

    Person.prototype.setName = function(value) {
      return this.name = value;
    };

    Person.prototype.getAge = function() {
      return this.age;
    };

    Person.prototype.addYear = function() {
      return this.age += 1;
    };

    return Person;

  })();

  describe("Spy", function() {
    var person;
    person = null;
    beforeEach(function() {
      return person = new Person("Jim", 25);
    });
    it("was called", function() {
      spyOn(person, 'getName');
      person.getName();
      return expect(person.getName).toHaveBeenCalled();
    });
    it("tracks the number of calls", function() {
      spyOn(person, 'addYear');
      person.addYear();
      person.addYear();
      return expect(person.addYear.calls.length).toEqual(2);
    });
    it("tracks call arguments", function() {
      spyOn(person, 'setName');
      person.setName("Ira");
      return expect(person.setName).toHaveBeenCalledWith("Ira");
    });
    it("has access to the last call", function() {
      spyOn(person, 'setName');
      person.setName("Ira");
      return expect(person.setName.mostRecentCall.args[0]).toEqual("Ira");
    });
    it("has access to all calls", function() {
      spyOn(person, 'setName');
      person.setName("Ira");
      return expect(person.setName.calls[0].args[0]).toEqual("Ira");
    });
    it("calls original function", function() {
      spyOn(person, 'getName').andCallThrough();
      expect(person.getName()).toEqual("Jim");
      return expect(person.getName).toHaveBeenCalled();
    });
    it("returns fake value", function() {
      spyOn(person, 'getName').andReturn("Dan");
      expect(person.getName()).toEqual("Dan");
      return expect(person.getName).toHaveBeenCalled();
    });
    it("calls fake function", function() {
      spyOn(person, 'getAge').andCallFake(function() {
        return 5 * 11;
      });
      expect(person.getAge()).toEqual(55);
      return expect(person.getAge).toHaveBeenCalled();
    });
    it("creates fake function", function() {
      var concat;
      concat = jasmine.createSpy('CONCAT');
      concat("one", "two");
      expect(concat.identity).toEqual('CONCAT');
      expect(concat).toHaveBeenCalledWith("one", "two");
      return expect(concat.calls.length).toEqual(1);
    });
    return it("creates fake object", function() {
      var button;
      button = jasmine.createSpyObj('BUTTON', ['click', 'setTitle', 'getTitle']);
      button.click();
      button.setTitle("Help");
      expect(button.click).toBeDefined();
      expect(button.click).toHaveBeenCalled();
      expect(button.setTitle).toHaveBeenCalledWith("Help");
      return expect(button.getTitle).not.toHaveBeenCalled();
    });
  });

  describe("Clock", function() {
    var callback;
    callback = null;
    beforeEach(function() {
      callback = jasmine.createSpy('TIMER');
      return jasmine.Clock.useMock();
    });
    return it("calls timeout function synchronously", function() {
      setTimeout((function() {
        return callback();
      }), 100);
      expect(callback).not.toHaveBeenCalled();
      jasmine.Clock.tick(101);
      return expect(callback).toHaveBeenCalled();
    });
  });

  describe("Any", function() {
    var person;
    person = null;
    beforeEach(function() {
      return person = new Person("Jim", 25);
    });
    return it("checks type name", function() {
      spyOn(person, 'setName');
      person.setName("Ira");
      return expect(person.setName).toHaveBeenCalledWith(jasmine.any(String));
    });
  });

  jasmineEnv = jasmine.getEnv();

  jasmineEnv.updateInterval = 250;

  currentWindowOnload = window.onload;

  window.onload = function() {
    if (currentWindowOnload) {
      currentWindowOnload();
    }
    return execJasmine();
  };

  execJasmine = function() {
    return jasmineEnv.execute();
  };

  htmlReporter = new jasmine.HtmlReporter();

  jasmineEnv.addReporter(htmlReporter);

  jasmineEnv.specFilter = function(spec) {
    return htmlReporter.specFilter(spec);
  };

}).call(this);
