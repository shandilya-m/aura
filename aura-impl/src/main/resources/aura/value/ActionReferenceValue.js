/*
 * Copyright (C) 2013 salesforce.com, inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/*jslint sub: true */
/**
 * @class ActionReferenceValue.
 *
 * this is the underlying value object for an attribute in a component of type Aura.Action.
 * You can use ActionReferenceValue to pass an action to another component that will invoke the action.
 * A value object is a thin wrapper around the actual data. The wrapper layer around the literal JavaScript objects enables you
 * to modify data in a transactional manner. The framework selectively rerenders and updates the UI in response to data changes.
 *
 * @param {ActionDef} actionDef An ActionDef object includes the Action Definition name, descriptor, action type, method, and parameter definitions.
 * @param {Object} def If def is provided, set the name for this type to the qualified name.
 * @param {Component} component A Component object associated with this type.
 * @constructor
 * @protected
 * @export
 */
function ActionReferenceValue(actionDef, def, component){
    this.actionDef = actionDef;
    this.component = component;
//#if {"modes" : ["STATS"]}
    valueFactory.index(this);
//#end
}

/**
 * Returns the unwrapped value. This is a new ActionDef instance based on the associated component.
 * @export
 */
ActionReferenceValue.prototype.getAction = function(){
    return this.actionDef.newInstance(this.component);
};

/**
 * Always returns false as the object is immutable.
 * @export
 */
ActionReferenceValue.prototype.isDirty = function(){
    return false;
};

/**
 * Destroys the component and its action definition.
 * @export
 */
ActionReferenceValue.prototype.destroy = function(){
//#if {"modes" : ["STATS"]}
    valueFactory.deIndex(this);
//#end
    delete this.actionDef;
    delete this.component;
};

/**
 * Returns this type as a String.
 * @export
 */
ActionReferenceValue.prototype.toString = function(){
    return "ActionReferenceValue";
};

Aura.Value.ActionReferenceValue = ActionReferenceValue;