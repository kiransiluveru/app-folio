import React from "react";
import {configure, shallow} from "enzyme";
import chai, {expect} from "chai";
import chaiEnzyme from "chai-enzyme";
import Adapter from "enzyme-adapter-react-16";
import App from "../App";
import { Provider } from "react-redux";
import { Link, Route, Routes } from "react-router-dom";

configure({
   adapter: new Adapter()
});

describe("Testing <App/> Component", () => {
   it("Check for Kanban Text", () => {
      const wrapper = shallow(<App />);
    //   console.log("d", wrapper.debug())
      expect(wrapper.contains('Kanban')).to.be.true
   });
   chai.use(chaiEnzyme());
});

describe('Test <App /> Component', () => {
     it('check for Provider', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.find(Provider)).length.to.have.lengthOf(1);
     })
})

describe('Test <App /> Component', () => {
    it('check for Routes Component', () => {
        const wrapper = shallow(<App />)
        expect(wrapper.find(Routes)).length.to.have.lengthOf(1)
    })
})

describe('Test <App /> Component', () => {
    it('check for Route Component', () => {
        const wrapper = shallow(<App />)
        expect(wrapper.find(Route)).length.to.have.lengthOf(2)
    })
})

describe('Test <App /> Component', () => {
    it('Should have 2 links', () => {
        const wrapper = shallow(<App />)
        expect(wrapper.find(Link)).length.to.have.lengthOf(2)
    })
})