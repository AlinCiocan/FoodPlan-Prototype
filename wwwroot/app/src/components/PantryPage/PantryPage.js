import React, { Component } from 'react'
import editIcon from './images/edit-icon.svg';
import removeIcon from './images/remove-icon.svg';

export default class PantryPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            
        };
    }

    twoDigits(value) {
        return ('0' + value).slice(-2);
    }

    formatDate(dateString) {
        var date = new Date(dateString);
        var twoDigits = this.twoDigits;
        
        return `Exp: ${twoDigits(date.getDate())}.${twoDigits(date.getMonth() + 1)}.${date.getFullYear()}`;
    }

    onEdit(itemId) {
        this.props.router.push(`/pantry/${this.props.pantry.id}/edit-item/${itemId}`);
    }

    onRemove(itemId) {
        this.props.onRemoveItem(itemId);
    }

    renderPantryItem(item) {
        return (
            <div className="pantry__item" key={item.id}>
                <div className="pantry__item-img">
                </div>
                <div className="pantry__item-details">
                    <div className="pantry__item-name">
                        {item.name}
                    </div>
                    <div className="pantry__item-expiration">
                        {this.formatDate(item.expiration)}
                    </div>
                    <div className="pantry__item-actions">
                        <img 
                            src={editIcon} 
                            onClick={this.onEdit.bind(this, item.id)}
                            className="pantry__item-action" 
                            alt="Edit pantry item icon"  />
                        <img 
                            src={removeIcon} 
                            onClick={this.onRemove.bind(this, item.id)}
                            className="pantry__item-action" 
                            alt="Remove pantry item icon" />
                    </div>
                </div>
            </div>
        );
    }

    renderPantryList(list) {
        return (
            <div key={list.key} className="pantry__list">
                <div className="pantry__list-title">
                    {list.title}
                </div>
                <div className="pantry__items">
                    {list.items.map(item => this.renderPantryItem(item))}
                </div>
            </div>
        );

    }

    render() {
        return (
            <div className="pantry__lists">
                {this.props.pantry.lists.map(pantryList => this.renderPantryList(pantryList))}
            </div>
        );

    }
}