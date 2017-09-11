import { Element } from '@polymer/polymer/polymer-element';
import { PropertyAccessors } from '@polymer/polymer/lib/mixins/property-accessors';
import { PropertyEffects } from '@polymer/polymer/lib/mixins/property-effects';
import { render } from 'lit-html';

const withLit = Base => {
  return class extends PropertyEffects(PropertyAccessors(Base)) {
    // render as well as trigger original _propertiesChanged method
    _propertiesChanged(...args) {
      super._propertiesChanged(...args);
      render(this.render(), this.shadowRoot);
    }

    // prevents __templateInstance error during _propertiesChanged() execution
    static get template() {
      return '<!--empty-->';
    }
  };
};

export default class PolyLitElement extends withLit(Element) {}
