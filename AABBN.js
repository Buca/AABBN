const AABBN = ( function() {

function AABBN( min = [ -.5, -.5 ], max = [ .5, .5 ] ) {

	this.min = min;
	this.max = max;

};

var dimension$0 = 0,
	delta$0 = 0,
	pointsL$0 = 0,

	i$0 = 0,
	i$1 = 0,

	_min = Math.min,
	_max = Math.max;

Object.assign( AABBN.prototype, {

	set: function( min, max, copy = false ) {

		if( copy === true ) {

			this.min = min;
			this.max = max;

			return this;

		}

		dimension$0 = this.min.length;

		for( i$0 = 0; i$0 !== dimension$0; i$0 ++ ) {

			this.min[ i$0 ] = min[ i$0 ];
			this.max[ i$0 ] = max[ i$0 ];

		}

		return this;

	},

	offset: function( position ) {

		dimension$0 = this.min.length;

		for( i$0 = 0; i$0 !== dimension$0; i$0 ++ ) {

			this.min[ i$0 ] += position[ i$0 ];
			this.max[ i$0 ] += position[ i$0 ];

		}

		return this;

	},

	scale: function( amount ) {

		if( amount >= 0 ) {

			for( i$0 = 0; i$0 !== dimension$0; i$0 ++ ) {

				this.min *= amount;
				this.max *= amount;

			}

		}

		else if( amount < 0 ) {

			for( i$0 = 0; i$0 !== dimension$0; i$0 ++ ) {

				min$0 = amount * this.max;
				this.max = amount * this.min;
				this.min = min$0;

			}

		}

		return this;

	},

	centerTo: function( position ) {

		dimension$0 = this.min.length;

		for( i$0 = 0; i$0 !== dimension$0; i$0 ++ ) {

			delta$0 = .5 * ( this.max[ i$0 ] - this.min[ i$0 ] );

			this.min[ i$0 ] = position[ i$0 ] - delta$0;
			this.max[ i$0 ] = position[ i$0 ] + delta$0;

		}

		return this;

	},

	alignTo: function( position, anchor ) {

		dimension$0 = this.min.length;

		for( i$0 = 0; i$0 !== dimension$0; i$0 ++ ) {

			delta$0 = anchor[ i$0 ] * ( this.max[ i$0 ] - this.min[ i$0 ] );

			this.min[ i$0 ] = position[ i$0 ] - delta$0;
			this.max[ i$0 ] = position[ i$0 ] + delta$0;

		}

		return this;

	},

	extrude: function( amount ) {

		dimension$0 = this.min.length;

		for( i$0 = 0; i$0 !== dimension$0; i$0 ++ ) {

			this.min[ i$0 ] -= amount[ i$0 ];
			this.max[ i$0 ] += amount[ i$0 ];

		}

		return this;

	},

	clone: function() {

		return new this.constructor( [ ...this.min, ...this.max ] );

	},

	copy: function( aabb ) {

		dimension$0 = this.min.length;

		for( i$0 = 0; i$0 !== dimension$0; i$0 ++ ) {

			this.min[ i$0 ] = _min( this.min[ i$0 ], min[ i$0 ] );
			this.max[ i$0 ] = _max( this.max[ i$0 ], max[ i$0 ] );

		}

		return this;

	},

	extend: function( min, max ) {

		dimension$0 = this.min.length;

		for( i$0 = 0; i$0 !== dimension$0; i$0 ++ ) {

			this.min[ i$0 ] = _min( this.min[ i$0 ], min[ i$0 ] );
			this.max[ i$0 ] = _max( this.max[ i$0 ], max[ i$0 ] );

		}

		return this;

	},

	// Not done
	extendFromPoints: function( points ) {

		dimension$0 = this.min.length;
		pointsL$0 = points.length;

		for( i$0 = 0; i$0 !== dimension$0; i$0 ++ ) {

			for( i$1 = 0; i$1 !== pointsL$0; i$1 ++ ) {

				this.min[ i$0 ] = _min( this.min[ i$0 ], points[ i$1 ][ i$0 ] );
				this.max[ i$0 ] = _max( this.max[ i$0 ], points[ i$1 ][ i$0 ] );

			}

		}

		return this;

	},

	// Not done
	setFromPoints: function( points ) {

		dimension$0 = this.min.length;
		pointsL$0 = points.length;

		for( i$0 = 0; i$0 !== dimension$0; i$0 ++ ) {

			this.min[ i$0 ] = points[ 0 ][ i$0 ];
			this.max[ i$0 ] = points[ 0 ][ i$0 ];

			for( i$1 = 1; i$1 !== pointsL$0; i$1 ++ ) {

				this.min[ i$0 ] = _min( this.min[ i$0 ], points[ i$1 ][ i$0 ] );
				this.max[ i$0 ] = _max( this.max[ i$0 ], points[ i$1 ][ i$0 ] );

			}

		}

		return this;

	},

	intersects: function( aabb ) {

		dimension$0 = this.min.length;

		for( i$0 = 0; i$0 !== dimension$0; i$0 ++ ) {

			if( aabb.min[ i$0 ] > this.max[ i$0 ] ||
				aabb.max[ i$0 ] < this.min[ i$0 ] ) {

				return false;

			}

		}

		return true;

	},

	almostIntersects: function( aabb, epsilon = Number.EPSILON ) {

		dimension$0 = this.min.length;

		for( i$0 = 0; i$0 !== dimension$0; i$0 ++ ) {

			if( aabb.min[ i$0 ] > this.max[ i$0 ] - epsilon ||
				aabb.max[ i$0 ] < this.min[ i$0 ] + epsilon ) {

				return false;

			}

		}

		return true;

	},

	contains: function( aabb ) {

		dimension$0 = this.min.length;

		for( i$0 = 0; i$0 !== dimension$0; i$0 ++ ) {

			if( this.min[ i$0 ] > aabb.min[ i$0 ] ||
				this.max[ i$0 ] < aabb.max[ i$0 ] ) {

				return false;

			}

		}

		return true;

	},

	almsotContains: function( aabb, epsilon = Number.EPSILON ) {

		dimension$0 = this.min.length;

		for( i$0 = 0; i$0 !== dimension$0; i$0 ++ ) {

			if( this.min[ i$0 ] > aabb.min[ i$0 ] + epsilon ||
				this.max[ i$0 ] < aabb.max[ i$0 ] - epsilon ) {

				return false;

			}

		}

		return true;

	}

} );

return AABBN;

} )();
