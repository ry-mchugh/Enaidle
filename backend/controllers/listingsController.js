const Listing = require("../models/listingModel");
const mongoose = require("mongoose");
const OrgUser = require("../models/orgUserModel");
const { Comment } = require("../models/commentModel");

const getAllListings = async (req, res) => {
  const listings = await Listing.find({});
  res.status(200).json(listings);
};

const createListing = async (req, res) => {
  const {
    organisationName,
    title,
    requirement,
    description,
    address,
    neededByDate,
  } = req.body;

  try {
    const listing = await Listing.create({
      organisationName,
      title,
      requirement,
      description,
      address,
      neededByDate,
    });
    res.status(200).json(listing);
  } catch (error)  {
    res.status(400).json({  error: error.message  });
  }
};

const deleteListing = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No listing with id: ${id}`);
  }

  const listing = await Listing.findByIdAndRemove(id);

  if (!listing) {
    return res.status(404).send(`No listing with id: ${id}`);
  }
};

const addCommentToAListing = async (req, res) => {
  const listing = await Listing.find({ _id: req.params.listingId });

  try {
    let comment;
    if (req.body.orgUserId) {
      comment = new Comment({
        orgUser_id: req.body.orgUserId,
        content: req.body.content,
      });
    } else {
      comment = new Comment({
        indUser_id: req.body.indUser._id,
        content: req.body.content,
      });
    }

    listing.Comments.push(comment);

    const updatedListing = await listing.save();

    res.status(200).json(updatedListing);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllListings,
  createListing,
  deleteListing,
  addCommentToAListing,
};