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
({
    render : function(component) {
        var value = component.get("v.value");
        if($A.util.isUndefinedOrNull(value)){
            value = "";
        }

        if(!($A.util.isComponent(value) || $A.util.isArray(value))){
            // JBUCH: HALO: TODO: MIGHT BE ABLE TO RETURN THIS TO SIMPLE TEXTNODE MANAGEMENT
        	var owner = component.getOwner();
        	var context = $A.getContext();  	
        	context.setCurrentAccess(owner);
            component._lastRenderedTextNode = value = $A.createComponentFromConfig({ descriptor: "markup://aura:text", attributes:{ value: value } });
            context.releaseCurrentAccess();
            
            $A.lockerService.trust(owner, value);
        }

        return $A.renderingService.renderFacet(component,value);
    },

    rerender : function(component) {
        var ret=[];
        if (component.isRendered()) {
            var value = component.get("v.value");
            if(!($A.util.isComponent(value)||$A.util.isArray(value))){
                if($A.util.isUndefinedOrNull(value)){
                    value = "";
                }
                if(component._lastRenderedTextNode && component._lastRenderedTextNode.isValid()){
                    // JBUCH: HALO: TODO: MIGHT BE ABLE TO RETURN THIS TO SIMPLE TEXTNODE MANAGEMENT
                    component._lastRenderedTextNode.set("v.value",value,true);
                    value=component._lastRenderedTextNode;
                    return $A.rerender(value);
                }else {
                    value = $A.createComponentFromConfig({descriptor: 'markup://aura:text', attributes: {value: value}});
                }
            }
            ret=$A.renderingService.rerenderFacet(component, value);
        }
        return ret;
    },

    unrender : function(component) {
        $A.renderingService.unrenderFacet(component);
        if (component._lastRenderedTextNode) {
            component._lastRenderedTextNode.destroy();
            delete component._lastRenderedTextNode;
        }
    },

    afterRender : function(component) {
        var value = component.get("v.value");
        if ($A.util.isComponent(value)||$A.util.isArray(value)) {
            $A.afterRender(value);
        }
    }
})// eslint-disable-line semi
